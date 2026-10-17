// png-para-mp4.swift — junta quadros PNG (0001.png, 0002.png…) num MP4 H.264,
// o formato que o Instagram aceita em stories e reels. Usa o codificador
// nativo do macOS (AVFoundation): não precisa instalar ffmpeg.
//
// Uso: swift scripts/png-para-mp4.swift <pasta-dos-quadros> <fps> <saida.mp4>
// (o render.mjs compila uma vez e reaproveita o binário)
import AVFoundation
import CoreGraphics
import ImageIO
import Foundation

let args = CommandLine.arguments
guard args.count == 4, let fps = Int32(args[2]) else {
    FileHandle.standardError.write("uso: png-para-mp4 <pasta> <fps> <saida.mp4>\n".data(using: .utf8)!)
    exit(2)
}
let pasta = URL(fileURLWithPath: args[1])
let saida = URL(fileURLWithPath: args[3])
let quadros = try FileManager.default.contentsOfDirectory(at: pasta, includingPropertiesForKeys: nil)
    .filter { $0.pathExtension.lowercased() == "png" }
    .sorted { $0.lastPathComponent < $1.lastPathComponent }
guard let primeiro = quadros.first,
      let fonte0 = CGImageSourceCreateWithURL(primeiro as CFURL, nil),
      let img0 = CGImageSourceCreateImageAtIndex(fonte0, 0, nil) else {
    FileHandle.standardError.write("nenhum quadro PNG em \(pasta.path)\n".data(using: .utf8)!)
    exit(1)
}
let largura = img0.width, altura = img0.height

try? FileManager.default.removeItem(at: saida)
let escritor = try AVAssetWriter(outputURL: saida, fileType: .mp4)
let entrada = AVAssetWriterInput(mediaType: .video, outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: largura,
    AVVideoHeightKey: altura,
    AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: 12_000_000,          // folga: o Instagram recomprime
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
        AVVideoMaxKeyFrameIntervalKey: Int(fps),
    ],
])
entrada.expectsMediaDataInRealTime = false
let adaptador = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: entrada, sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
    kCVPixelBufferWidthKey as String: largura,
    kCVPixelBufferHeightKey as String: altura,
])
escritor.add(entrada)
escritor.startWriting()
escritor.startSession(atSourceTime: .zero)

let espaco = CGColorSpace(name: CGColorSpace.sRGB)!
for (i, url) in quadros.enumerated() {
    guard let fonte = CGImageSourceCreateWithURL(url as CFURL, nil),
          let img = CGImageSourceCreateImageAtIndex(fonte, 0, nil) else { continue }
    while !entrada.isReadyForMoreMediaData { usleep(2000) }
    var buffer: CVPixelBuffer?
    CVPixelBufferPoolCreatePixelBuffer(nil, adaptador.pixelBufferPool!, &buffer)
    guard let pb = buffer else { continue }
    CVPixelBufferLockBaseAddress(pb, [])
    let ctx = CGContext(data: CVPixelBufferGetBaseAddress(pb), width: largura, height: altura, bitsPerComponent: 8,
                        bytesPerRow: CVPixelBufferGetBytesPerRow(pb), space: espaco,
                        bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)!
    ctx.draw(img, in: CGRect(x: 0, y: 0, width: largura, height: altura))
    CVPixelBufferUnlockBaseAddress(pb, [])
    adaptador.append(pb, withPresentationTime: CMTime(value: CMTimeValue(i), timescale: fps))
}
entrada.markAsFinished()
let fim = DispatchSemaphore(value: 0)
escritor.finishWriting { fim.signal() }
fim.wait()
if escritor.status != .completed {
    FileHandle.standardError.write("falhou: \(escritor.error?.localizedDescription ?? "?")\n".data(using: .utf8)!)
    exit(1)
}
print("\(quadros.count) quadros → \(saida.lastPathComponent)")
