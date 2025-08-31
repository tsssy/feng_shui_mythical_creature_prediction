import { useRef, useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

interface SpiritEntity {
  id: string;
  name: string;
  category: 'guardian' | 'deity' | 'mythical_beast' | 'feng_shui';
  position: { x: number; y: number; width: number; height: number };
  description: string;
  significance: string;
  spiritImageUrl: string;
  recommendedActivities: string[];
  activityZone: string;
}

interface EnhancedImageViewerProps {
  originalImage: string;
  spirits: SpiritEntity[];
  isVideo?: boolean;
}

export function EnhancedImageViewer({ originalImage, spirits, isVideo = false }: EnhancedImageViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCompositing, setIsCompositing] = useState(false);
  const [compositedImageUrl, setCompositedImageUrl] = useState<string | null>(null);

  const compositeImage = async () => {
    if (!canvasRef.current || spirits.length === 0) return;

    setIsCompositing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      // 加载原始图片
      const originalImg = new Image();
      await new Promise((resolve, reject) => {
        originalImg.onload = resolve;
        originalImg.onerror = reject;
        originalImg.crossOrigin = 'anonymous';
        originalImg.src = originalImage;
      });

      // 设置画布大小
      canvas.width = originalImg.width;
      canvas.height = originalImg.height;

      // 绘制原始图片
      ctx.drawImage(originalImg, 0, 0);

      // 加载并绘制每个神兽
      for (const spirit of spirits) {
        try {
          const spiritImg = new Image();
          await new Promise((resolve, reject) => {
            spiritImg.onload = resolve;
            spiritImg.onerror = reject;
            spiritImg.crossOrigin = 'anonymous';
            spiritImg.src = spirit.spiritImageUrl;
          });

          // 计算神兽在画布上的实际位置和大小
          const x = (spirit.position.x / 100) * canvas.width;
          const y = (spirit.position.y / 100) * canvas.height;
          const width = (spirit.position.width / 100) * canvas.width;
          const height = (spirit.position.height / 100) * canvas.height;

          // 保存当前状态
          ctx.save();
          
          // 设置透明度和混合模式以获得更好的视觉效果
          ctx.globalAlpha = 0.8;
          ctx.globalCompositeOperation = 'source-over';

          // 绘制神兽
          ctx.drawImage(spiritImg, x, y, width, height);

          // 恢复状态
          ctx.restore();

          // 添加标签背景（圆角矩形）
          ctx.fillStyle = 'rgba(220, 38, 127, 0.9)';
          const labelWidth = spirit.name.length * 12 + 16;
          const labelHeight = 24;
          const labelX = x;
          const labelY = y - 30;
          const radius = 4;
          
          ctx.beginPath();
          ctx.moveTo(labelX + radius, labelY);
          ctx.lineTo(labelX + labelWidth - radius, labelY);
          ctx.quadraticCurveTo(labelX + labelWidth, labelY, labelX + labelWidth, labelY + radius);
          ctx.lineTo(labelX + labelWidth, labelY + labelHeight - radius);
          ctx.quadraticCurveTo(labelX + labelWidth, labelY + labelHeight, labelX + labelWidth - radius, labelY + labelHeight);
          ctx.lineTo(labelX + radius, labelY + labelHeight);
          ctx.quadraticCurveTo(labelX, labelY + labelHeight, labelX, labelY + labelHeight - radius);
          ctx.lineTo(labelX, labelY + radius);
          ctx.quadraticCurveTo(labelX, labelY, labelX + radius, labelY);
          ctx.closePath();
          ctx.fill();

          // 添加文字标签
          ctx.fillStyle = 'white';
          ctx.font = '14px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(spirit.name, x + 8, y - 12);

        } catch (error) {
          console.warn(`无法加载神兽图片: ${spirit.name}`, error);
        }
      }

      // 生成合成图片的数据URL
      const dataUrl = canvas.toDataURL('image/png');
      setCompositedImageUrl(dataUrl);

    } catch (error) {
      console.error('图片合成失败:', error);
    } finally {
      setIsCompositing(false);
    }
  };

  useEffect(() => {
    if (originalImage && spirits.length > 0) {
      compositeImage();
    }
  }, [originalImage, spirits]);

  const downloadImage = () => {
    if (!compositedImageUrl) return;

    const link = document.createElement('a');
    link.href = compositedImageUrl;
    link.download = `风水神兽预测_${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      guardian: '守护神',
      deity: '神祇',
      mythical_beast: '神兽',
      feng_shui: '风水物品'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      guardian: 'bg-red-100 text-red-800',
      deity: 'bg-yellow-100 text-yellow-800',
      mythical_beast: 'bg-blue-100 text-blue-800',
      feng_shui: 'bg-green-100 text-green-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">风水神兽预测结果</h3>
          {compositedImageUrl && (
            <Button 
              onClick={downloadImage}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              下载图片
            </Button>
          )}
        </div>
        
        <p className="text-muted-foreground mb-4">
          根据风水理论，为您的房间推荐最适合的神明：
        </p>

        <div className="space-y-4">
          {/* 显示合成后的图片 */}
          {isCompositing ? (
            <div className="flex items-center justify-center p-8 border-2 border-dashed border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span>正在合成神兽图像...</span>
              </div>
            </div>
          ) : compositedImageUrl ? (
            <div className="text-center">
              <img
                src={compositedImageUrl}
                alt="风水神兽预测合成图"
                className="w-full max-w-2xl mx-auto rounded-lg border shadow-lg"
              />
              <p className="text-sm text-muted-foreground mt-2">
                已将预测的神明形象添加到您的房间图片中
              </p>
            </div>
          ) : (
            <div className="text-center p-8 border-2 border-dashed border-border rounded-lg">
              <p className="text-muted-foreground">正在准备神兽图像...</p>
            </div>
          )}

          {/* 隐藏的画布用于合成 */}
          <canvas
            ref={canvasRef}
            className="hidden"
          />
        </div>
      </Card>

      {/* 神兽详细信息 */}
      <div className="grid gap-4">
        {spirits.map((spirit) => (
          <Card key={spirit.id} className="p-4 border border-border/50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-shrink-0">
                <img
                  src={spirit.spiritImageUrl}
                  alt={spirit.name}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-medium">{spirit.name}</h4>
                  <Badge className={getCategoryColor(spirit.category)}>
                    {getCategoryLabel(spirit.category)}
                  </Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <p>{spirit.description}</p>
                  
                  <div>
                    <span className="font-medium text-muted-foreground">风水作用：</span>
                    <span className="ml-1">{spirit.significance}</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-muted-foreground">活动区域：</span>
                    <span className="ml-1 text-primary font-medium">{spirit.activityZone}</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-muted-foreground">推荐活动：</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {spirit.recommendedActivities.map((activity, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <h4 className="font-medium mb-2">🔮 风水预测说明</h4>
        <p className="text-sm text-muted-foreground">
          本预测基于传统风水理论和房间布局分析，神明的位置根据方位、光线、通风等因素综合判断。
          这位神明将为您的居住空间带来专属的正能量和好运。
        </p>
      </div>
    </div>
  );
}