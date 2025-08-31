import { useState, useRef } from 'react';
import { Upload, Camera, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface FileUploadProps {
  onFileSelect: (file: File, type: 'image' | 'video') => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function FileUpload({ onFileSelect, onAnalyze, isAnalyzing }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      const type = file.type.startsWith('video/') ? 'video' : 'image';
      onFileSelect(file, type);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: false 
      });
      setMediaStream(stream);
      setIsRecording(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('无法访问摄像头:', error);
      alert('无法访问摄像头，请检查权限设置');
    }
  };

  const stopRecording = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    setIsRecording(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'captured-photo.jpg', { type: 'image/jpeg' });
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            onFileSelect(file, 'image');
            stopRecording();
          }
        }, 'image/jpeg');
      }
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-medium text-primary">上传房间照片或视频</h2>
        <p className="text-muted-foreground">基于传统风水理论，预测最适合您房间的神兽位置</p>
        
        {!selectedFile && !isRecording && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full"
                >
                  选择文件
                </Button>
                <p className="text-sm text-muted-foreground">
                  支持JPG、PNG、MP4等格式
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">或</span>
              </div>
            </div>
            
            <Button
              onClick={startRecording}
              variant="outline"
              className="w-full"
            >
              <Camera className="w-4 h-4 mr-2" />
              使用摄像头拍照
            </Button>
          </div>
        )}

        {isRecording && (
          <div className="space-y-4">
            <video
              ref={videoRef}
              className="w-full max-w-md mx-auto rounded-lg border"
              autoPlay
              muted
              playsInline
            />
            <div className="flex gap-2 justify-center">
              <Button onClick={capturePhoto} className="bg-red-600 hover:bg-red-700">
                拍照
              </Button>
              <Button onClick={stopRecording} variant="outline">
                取消
              </Button>
            </div>
          </div>
        )}

        {selectedFile && previewUrl && (
          <div className="space-y-4">
            <div className="relative">
              {selectedFile.type.startsWith('video/') ? (
                <video
                  src={previewUrl}
                  className="w-full max-w-md mx-auto rounded-lg border"
                  controls
                />
              ) : (
                <img
                  src={previewUrl}
                  alt="预览"
                  className="w-full max-w-md mx-auto rounded-lg border object-cover"
                />
              )}
              <Button
                onClick={clearSelection}
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                文件名: {selectedFile.name}
              </p>
              <Button
                onClick={onAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {isAnalyzing ? '正在预测中...' : '开始风水预测'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}