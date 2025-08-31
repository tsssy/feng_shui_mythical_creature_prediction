import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { AnalysisResult, DetectedEntity } from './components/AnalysisResult';
import { FengShuiGuide } from './components/FengShuiGuide';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card } from './components/ui/card';
import { Sparkles, Eye, BookOpen } from 'lucide-react';

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<DetectedEntity[]>([]);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

  // 风水神兽预测数据
  const fengShuiSpirits: DetectedEntity[] = [
    // 四神兽
    {
      id: '1',
      name: '青龙',
      category: 'mythical_beast',
      confidence: 0.92,
      position: { x: 75, y: 20, width: 18, height: 22 },
      description: '东方神兽青龙，主管东方，象征生机与活力，掌管事业和学业运势。',
      significance: '提升事业运，增强学习能力，带来新的机会和突破。',
      spiritImageUrl: 'https://images.unsplash.com/photo-1751201593592-04dcae9b4f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2FydG9vbiUyMGRyYWdvbiUyMGNoaW5lc2V8ZW58MXx8fHwxNzU2NjM1MDcyfDA&ixlib=rb-4.1.0&q=80&w=200',
      recommendedActivities: ['学习工作', '制定计划', '阅读写作', '思考决策', '创意设计'],
      activityZone: '学习工作区'
    },
    {
      id: '2',
      name: '朱雀',
      category: 'mythical_beast',
      confidence: 0.88,
      position: { x: 50, y: 5, width: 16, height: 20 },
      description: '南方神兽朱雀，主管南方，象征光明与希望，掌管名声和人际关系。',
      significance: '提升人际运势，增强个人魅力，带来声誉和社交机会。',
      spiritImageUrl: 'https://images.unsplash.com/photo-1579541982208-f050c2503aae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcGhvZW5peCUyMGJpcmQlMjBjYXJ0b29ufGVufDF8fHx8MTc1NjYzNTA3NXww&ixlib=rb-4.1.0&q=80&w=200',
      recommendedActivities: ['社交聚会', '接待客人', '演讲展示', '艺术表演', '庆祝活动'],
      activityZone: '社交会客区'
    },
    {
      id: '3',
      name: '白虎',
      category: 'mythical_beast',
      confidence: 0.85,
      position: { x: 5, y: 35, width: 17, height: 21 },
      description: '西方神兽白虎，主管西方，象征勇气与力量，掌管财富和权威。',
      significance: '增强财运，提升权威感，带来勇气面对挑战。',
      spiritImageUrl: 'https://images.unsplash.com/photo-1674859875628-fc5f6a999453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwdGlnZXIlMjB3aGl0ZSUyMGNhcnRvb258ZW58MXx8fHwxNzU2NjM1MDc5fDA&ixlib=rb-4.1.0&q=80&w=200',
      recommendedActivities: ['理财投资', '重要决策', '商务谈判', '财务规划', '存放贵重物品'],
      activityZone: '财富管理区'
    },
    {
      id: '4',
      name: '玄武',
      category: 'mythical_beast',
      confidence: 0.90,
      position: { x: 40, y: 75, width: 20, height: 18 },
      description: '北方神兽玄武，主管北方，象征稳定与长寿，掌管健康和家庭和睦。',
      significance: '保佑身体健康，增进家庭和谐，带来稳定的基础运势。',
      spiritImageUrl: 'https://images.unsplash.com/photo-1562657553-f6aea958c170?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwdHVydGxlJTIwYmxhY2slMjBjYXJ0b29ufGVufDF8fHx8MTc1NjYzNTA4Mnww&ixlib=rb-4.1.0&q=80&w=200',
      recommendedActivities: ['休息睡眠', '冥想打坐', '养生保健', '家庭团聚', '静心思考'],
      activityZone: '健康休息区'
    },
    // 传统神祇
    {
      id: '5',
      name: '财神爷',
      category: 'deity',
      confidence: 0.87,
      position: { x: 25, y: 50, width: 15, height: 19 },
      description: '掌管财富的神祇，为家庭和事业带来财运和商机。',
      significance: '招财进宝，生意兴隆，投资有成，财源广进。',
      spiritImageUrl: 'https://images.unsplash.com/photo-1736688600613-c7168b2d5ac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZ29kJTIwb2YlMjB3ZWFsdGglMjBjaGluZXNlfGVufDF8fHx8MTc1NjYzNTA4N3ww&ixlib=rb-4.1.0&q=80&w=200',
      recommendedActivities: ['收纳财物', '记账理财', '商务洽谈', '投资计划', '祈财祈福'],
      activityZone: '财运聚集区'
    },
    {
      id: '6',
      name: '土地神',
      category: 'guardian',
      confidence: 0.83,
      position: { x: 60, y: 60, width: 14, height: 17 },
      description: '守护家宅的地方神祇，保佑一方土地平安，居住安康。',
      significance: '镇宅保平安，驱除邪气，保佑家人健康顺遂。',
      spiritImageUrl: 'https://images.unsplash.com/photo-1736688600613-c7168b2d5ac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXJlJTIwZ29kJTIwb2YlMjB3ZWFsdGglMjBjaGluZXNlfGVufDF8fHx8MTc1NjYzNTA4N3ww&ixlib=rb-4.1.0&q=80&w=200',
      recommendedActivities: ['家庭祭拜', '清洁整理', '祈求平安', '维护房屋', '邻里和睦'],
      activityZone: '家宅守护区'
    },
    // 新增传统神明
    {
      id: '7',
      name: '灶神',
      category: 'deity',
      confidence: 0.89,
      position: { x: 30, y: 45, width: 16, height: 20 },
      description: '也被称为灶君、东厨司命，是炉灶之神，负责监察家家户户的善恶，并在年底向天帝禀报。',
      significance: '保佑家庭和睦，饮食安全，监察家庭道德，带来吉祥平安。',
      spiritImageUrl: '/images/zaoshen-placeholder.svg',
      recommendedActivities: ['烹饪做饭', '家庭聚餐', '备餐准备', '厨房整理', '食材存储'],
      activityZone: '烹饪饮食区'
    },
    {
      id: '8',
      name: '门神',
      category: 'guardian',
      confidence: 0.86,
      position: { x: 10, y: 25, width: 18, height: 24 },
      description: '是守护家门的神明，被具体化为威武的神明形象，保佑家宅平安，是中国流传广泛的信仰。',
      significance: '镇宅辟邪，守护门户，阻挡恶灵，保护家人出入平安。',
      spiritImageUrl: '/images/menshen-placeholder.svg',
      recommendedActivities: ['进出门户', '迎接客人', '出门前祈福', '换鞋整装', '门厅整理'],
      activityZone: '门户守护区'
    },
    {
      id: '9',
      name: '中霤神',
      category: 'guardian',
      confidence: 0.81,
      position: { x: 45, y: 55, width: 15, height: 18 },
      description: '又称地基主或房舍的保护神，是家宅的土地神，在家庭中占有重要地位。',
      significance: '守护房屋根基，保佑家宅稳固，家庭成员身体健康，居住安康。',
      spiritImageUrl: '/images/zhongliushen-placeholder.svg',
      recommendedActivities: ['家庭聚会', '房屋保养', '中央供奉', '地面清洁', '基础维护'],
      activityZone: '房屋中心区'
    },
    {
      id: '10',
      name: '祖先',
      category: 'deity',
      confidence: 0.84,
      position: { x: 35, y: 30, width: 17, height: 21 },
      description: '古代社会对祖先有明确的供奉规定，供奉祖先是维系家族血脉、祈求庇护的重要方式。',
      significance: '庇护后代，传承家族文化，带来智慧指引，保佑家族兴旺。',
      spiritImageUrl: 'https://images.unsplash.com/photo-1703222422237-b056400ac9ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwYW5jZXN0cmFsJTIwc2hyaW5lfGVufDF8fHx8MTc1NjYzNTYzM3ww&ixlib=rb-4.1.0&q=80&w=200',
      recommendedActivities: ['祭祀祈祷', '家谱整理', '传统教育', '追思缅怀', '家族聚会'],
      activityZone: '祖先供奉区'
    },
    {
      id: '11',
      name: '行神',
      category: 'deity',
      confidence: 0.79,
      position: { x: 20, y: 40, width: 14, height: 18 },
      description: '在古代先秦时期，人们会祭祀行神，以求旅途平安，其凭依物可以是菩、棘、柏或茅草等。',
      significance: '保佑出行平安，旅途顺利，远行无忧，平安归来。',
      spiritImageUrl: 'https://images.unsplash.com/photo-1736688600613-c7168b2d5ac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZ29kJTIwb2YlMjB3ZWFsdGglMjBjaGluZXNlfGVufDF8fHx8MTc1NjYzNTA4N3ww&ixlib=rb-4.1.0&q=80&w=200',
      recommendedActivities: ['出行准备', '行李整理', '路线规划', '祈求平安', '旅行收纳'],
      activityZone: '出行准备区'
    },
    {
      id: '12',
      name: '仓神',
      category: 'deity',
      confidence: 0.82,
      position: { x: 55, y: 35, width: 16, height: 19 },
      description: '管理粮仓的神明，守护粮食丰收，减少损失。',
      significance: '保佑五谷丰登，粮食充足，家庭温饱，财富积累。',
      spiritImageUrl: 'https://images.unsplash.com/photo-1731142760611-2d35eabebdbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwZ3JhaW4lMjBzdG9yYWdlJTIwZ29kfGVufDF8fHx8MTc1NjYzNTYzNnww&ixlib=rb-4.1.0&q=80&w=200',
      recommendedActivities: ['储藏食物', '库存管理', '物品整理', '粮食保管', '家用囤积'],
      activityZone: '储藏保管区'
    },
    {
      id: '13',
      name: '井神',
      category: 'guardian',
      confidence: 0.80,
      position: { x: 70, y: 50, width: 15, height: 18 },
      description: '守护水井的神灵，在部分地区至今仍有供奉的习俗。',
      significance: '保佑水源清洁，饮水安全，家庭健康，生活无忧。',
      spiritImageUrl: 'https://images.unsplash.com/photo-1755511268111-9ebef96bc830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwd2VsbCUyMHdhdGVyJTIwZGVpdHl8ZW58MXx8fHwxNzU2NjM1NjQwfDA&ixlib=rb-4.1.0&q=80&w=200',
      recommendedActivities: ['取水用水', '水源管理', '清洁卫生', '洗漱准备', '水质保护'],
      activityZone: '水源管理区'
    },
    {
      id: '14',
      name: '厕神',
      category: 'guardian',
      confidence: 0.78,
      position: { x: 65, y: 70, width: 13, height: 16 },
      description: '古代对厕所的保护神，因厕所被视为污秽之地，也需要有神明来镇守和净洁。',
      significance: '净洁污秽，驱除病气，保佑家庭卫生，身体健康。',
      spiritImageUrl: 'https://images.unsplash.com/photo-1736688600613-c7168b2d5ac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZ29kJTIwb2YlMjB3ZWFsdGglMjBjaGluZXNlfGVufDF8fHx8MTc1NjYzNTA4N3ww&ixlib=rb-4.1.0&q=80&w=200',
      recommendedActivities: ['清洁消毒', '卫生管理', '空气净化', '除菌除臭', '健康维护'],
      activityZone: '卫生清洁区'
    }
  ];

  const handleFileSelect = (file: File, type: 'image' | 'video') => {
    setSelectedFile(file);
    setFileType(type);
    setAnalysisResults([]);
    
    // 创建预览URL
    const url = URL.createObjectURL(file);
    setOriginalImageUrl(url);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // 模拟风水分析过程
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 根据房间特征随机选择一位最适合的神明
    // 实际应用中这里会基于图像分析和风水理论进行预测
    const shuffledSpirits = [...fengShuiSpirits].sort(() => Math.random() - 0.5);
    const selectedSpirit = shuffledSpirits[0]; // 只选择一位神明
    
    // 根据房间布局调整神明位置（这里使用随机位置模拟）
    const adjustedResult = [{
      ...selectedSpirit,
      position: {
        x: Math.random() * 60 + 20, // 20-80%，居中一些
        y: Math.random() * 50 + 25, // 25-75%，居中一些
        width: Math.random() * 8 + 15, // 15-23%，稍大一些以突出单个神明
        height: Math.random() * 10 + 18, // 18-28%
      }
    }];
    
    setAnalysisResults(adjustedResult);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-medium text-primary">风水神兽预测师</h1>
            <Sparkles className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            基于传统风水理论，预测您房间中最适合的神兽位置，并将可爱的神兽形象添加到您的照片中
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="analyze" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="analyze" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              风水预测
            </TabsTrigger>
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              风水指南
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze" className="space-y-8">
            <FileUpload 
              onFileSelect={handleFileSelect}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
            
            {isAnalyzing && (
              <Card className="p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-lg">风水分析中...</span>
                </div>
                <p className="text-muted-foreground">
                  正在根据传统风水理论分析您的房间布局，预测最佳神兽位置...
                </p>
              </Card>
            )}
            
            {!isAnalyzing && analysisResults.length > 0 && (
              <AnalysisResult 
                results={analysisResults}
                originalImage={originalImageUrl || undefined}
                isVideo={fileType === 'video'}
              />
            )}
            
            {!selectedFile && !isAnalyzing && analysisResults.length === 0 && (
              <Card className="p-8 text-center bg-gradient-to-r from-red-50 to-yellow-50">
                <img
                  src="https://images.unsplash.com/photo-1614245693274-0be3f29a5c4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc1NjYzNDY1OXww&ixlib=rb-4.1.0&q=80&w=600"
                  alt="���统中式房间"
                  className="w-full max-w-md mx-auto rounded-lg mb-6 border shadow-lg"
                />
                <h3 className="text-xl font-medium mb-2">开始您的风水神兽预测</h3>
                <p className="text-muted-foreground">
                  上传您的房间照片，让AI基于风水理论预测最适合的神兽位置，并生成带有可爱神兽的合成图片
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="guide">
            <FengShuiGuide />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            本应用基于中国传统文化和风水学知识，仅供参考和娱乐。
            风水预测结果为算法生成，请结合实际情况和个人喜好判断。
          </p>
        </div>
      </div>
    </div>
  );
}