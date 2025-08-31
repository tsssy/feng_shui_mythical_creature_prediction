import { EnhancedImageViewer } from './EnhancedImageViewer';
import { Card } from './ui/card';

export interface DetectedEntity {
  id: string;
  name: string;
  category: 'guardian' | 'deity' | 'mythical_beast' | 'feng_shui';
  confidence: number;
  position: { x: number; y: number; width: number; height: number };
  description: string;
  significance: string;
  spiritImageUrl: string;
  recommendedActivities: string[];
  activityZone: string;
}

interface AnalysisResultProps {
  results: DetectedEntity[];
  originalImage?: string;
  isVideo?: boolean;
}

export function AnalysisResult({ results, originalImage, isVideo = false }: AnalysisResultProps) {
  if (results.length === 0) {
    return (
      <Card className="p-6 text-center">
        <h3 className="text-lg font-medium mb-2">暂无预测结果</h3>
        <p className="text-muted-foreground">
          无法基于当前图片进行风水预测。您可以尝试：
        </p>
        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
          <li>• 确保房间照片清晰完整</li>
          <li>• 包含更多房间布局细节</li>
          <li>• 拍摄不同角度的房间照片</li>
        </ul>
      </Card>
    );
  }

  if (!originalImage) {
    return null;
  }

  return (
    <EnhancedImageViewer
      originalImage={originalImage}
      spirits={results}
      isVideo={isVideo}
    />
  );
}