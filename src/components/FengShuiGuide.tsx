import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function FengShuiGuide() {
  const commonEntities = [
    {
      name: '青龙',
      category: '四神兽',
      description: '东方神兽，掌管春季和生机，象征事业发展和学业进步',
      significance: '提升事业运势，增强学习能力，带来新的机会',
      placement: '位于房间东方，适合书房、办公区域',
      activities: ['学习工作', '制定计划', '阅读写作', '思考决策', '创意设计'],
      imageUrl: 'https://images.unsplash.com/photo-1751201593592-04dcae9b4f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2FydG9vbiUyMGRyYWdvbiUyMGNoaW5lc2V8ZW58MXx8fHwxNzU2NjM1MDcyfDA&ixlib=rb-4.1.0&q=80&w=200'
    },
    {
      name: '朱雀',
      category: '四神兽',
      description: '南方神兽，掌管夏季和光明，象征名声和人际关系',
      significance: '提升人际运势，增强个人魅力和声誉',
      placement: '位于房间南方，适合客厅、会客区域',
      activities: ['社交聚会', '接待客人', '演讲展示', '艺术表演', '庆祝活动'],
      imageUrl: 'https://images.unsplash.com/photo-1579541982208-f050c2503aae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcGhvZW5peCUyMGJpcmQlMjBjYXJ0b29ufGVufDF8fHx8MTc1NjYzNTA3NXww&ixlib=rb-4.1.0&q=80&w=200'
    },
    {
      name: '白虎',
      category: '四神兽',
      description: '西方神兽，掌管秋季和收获，象征财富和权威',
      significance: '增强财运，提升权威感，带来勇气和决断力',
      placement: '位于房间西方，适合财位、保险柜附近',
      activities: ['理财投资', '重要决策', '商务谈判', '财务规划', '存放贵重物品'],
      imageUrl: 'https://images.unsplash.com/photo-1674859875628-fc5f6a999453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwdGlnZXIlMjB3aGl0ZSUyMGNhcnRvb258ZW58MXx8fHwxNzU2NjM1MDc5fDA&ixlib=rb-4.1.0&q=80&w=200'
    },
    {
      name: '玄武',
      category: '四神兽',
      description: '北方神兽，掌管冬季和稳定，象征健康和长寿',
      significance: '保佑身体健康，增进家庭和谐，带来稳定运势',
      placement: '位于房间北方，适合卧室、休息区域',
      activities: ['休息睡眠', '冥想打坐', '养生保健', '家庭团聚', '静心思考'],
      imageUrl: 'https://images.unsplash.com/photo-1562657553-f6aea958c170?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwdHVydGxlJTIwYmxhY2slMjBjYXJ0b29ufGVufDF8fHx8MTc1NjYzNTA4Mnww&ixlib=rb-4.1.0&q=80&w=200'
    },
    {
      name: '财神爷',
      category: '神祇',
      description: '掌管财富的神祇，为家庭和事业带来财运和商机',
      significance: '招财进宝，生意兴隆，投资有成，财源广进',
      placement: '面向大门或窗户，背靠实墙，远离厕所厨房',
      activities: ['收纳财物', '记账理财', '商务洽谈', '投资计划', '祈财祈福'],
      imageUrl: 'https://images.unsplash.com/photo-1736688600613-c7168b2d5ac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZ29kJTIwb2YlMjB3ZWFsdGglMjBjaGluZXNlfGVufDF8fHx8MTc1NjYzNTA4N3ww&ixlib=rb-4.1.0&q=80&w=200'
    },
    {
      name: '土地神',
      category: '守护神',
      description: '守护家宅的地方神祇，保佑一方土地平安，居住安康',
      significance: '镇宅保平安，驱除邪气，保佑家人健康顺遂',
      placement: '靠近地面，角落位置，保持清洁整齐',
      activities: ['家庭祭拜', '清洁整理', '祈求平安', '维护房屋', '邻里和睦'],
      imageUrl: 'https://images.unsplash.com/photo-1736688600613-c7168b2d5ac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZ29kJTIwb2YlMjB3ZWFsdGglMjBjaGluZXNlfGVufDF8fHx8MTc1NjYzNTA4N3ww&ixlib=rb-4.1.0&q=80&w=200'
    },
    {
      name: '门神',
      category: '守护神',
      description: '守护门户的神祇，驱邪避凶，保护家宅不受外邪侵扰',
      significance: '镇宅辟邪，保护家庭安全，阻挡负能量',
      placement: '大门两侧或门框上方，成对出现效果更佳',
      activities: ['进出门户', '迎接客人', '出门前祈福', '换鞋整装', '门厅整理'],
      imageUrl: '/images/menshen-placeholder.svg'
    },
    {
      name: '福禄寿',
      category: '神祇',
      description: '福星、禄星、寿星三位一体，代表幸福、官禄、长寿',
      significance: '带来全面的好运，家庭幸福，事业顺利，身体健康',
      placement: '客厅显眼位置，三神并列摆放',
      activities: ['全家聚会', '庆祝生日', '节日庆典', '祈福许愿', '家庭祷告'],
      imageUrl: '/images/福禄寿.png'
    },
    // 家宅专门神明
    {
      name: '灶神',
      category: '神祇',
      description: '也被称为灶君、东厨司命，是炉灶之神，负责监察家家户户的善恶，并在年底向天帝禀报',
      significance: '保佑家庭和睦，饮食安全，监察家庭道德，带来吉祥平安',
      placement: '厨房灶台附近，保持清洁，定期供奉',
      activities: ['烹饪做饭', '家庭聚餐', '备餐准备', '厨房整理', '食材存储'],
      imageUrl: '/images/zaoshen-placeholder.svg'
    },
    {
      name: '中霤神',
      category: '守护神',
      description: '又称地基主或房舍的保护神，是家宅的土地神，在家庭中占有重要地位',
      significance: '守护房屋根基，保佑家宅稳固，家庭成员身体健康，居住安康',
      placement: '房屋中央位置，地面附近，避免高处悬挂',
      activities: ['家庭聚会', '房屋保养', '中央供奉', '地面清洁', '基础维护'],
      imageUrl: '/images/zhongliushen-placeholder.svg'
    },
    {
      name: '祖先',
      category: '神祇',
      description: '古代社会对祖先有明确的供奉规定，供奉祖先是维系家族血脉、祈求庇护的重要方式',
      significance: '庇护后代，传承家族文化，带来智慧指引，保佑家族兴旺',
      placement: '客厅或专门的祖先堂，位置庄重，朝向吉方',
      activities: ['祭祀祈祷', '家谱整理', '传统教育', '追思缅怀', '家族聚会'],
      imageUrl: 'https://images.unsplash.com/photo-1703222422237-b056400ac9ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwYW5jZXN0cmFsJTIwc2hyaW5lfGVufDF8fHx8MTc1NjYzNTYzM3ww&ixlib=rb-4.1.0&q=80&w=200'
    },
    {
      name: '行神',
      category: '神祇',
      description: '在古代先秦时期，人们会祭祀行神，以求旅途平安，其凭依物可以是菩、棘、柏或茅草等',
      significance: '保佑出行平安，旅途顺利，远行无忧，平安归来',
      placement: '玄关或门口附近，方便出行前祈祷',
      activities: ['出行准备', '行李整理', '路线规划', '祈求平安', '旅行收纳'],
      imageUrl: 'https://images.unsplash.com/photo-1736688600613-c7168b2d5ac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZ29kJTIwb2YlMjB3ZWFsdGglMjBjaGluZXNlfGVufDF8fHx8MTc1NjYzNTA4N3ww&ixlib=rb-4.1.0&q=80&w=200'
    },
    {
      name: '仓神',
      category: '神祇',
      description: '管理粮仓的神明，守护粮食丰收，减少损失',
      significance: '保佑五谷丰登，粮食充足，家庭温饱，财富积累',
      placement: '储藏室、米缸或粮食存放处附近',
      activities: ['储藏食物', '库存管理', '物品整理', '粮食保管', '家用囤积'],
      imageUrl: 'https://images.unsplash.com/photo-1731142760611-2d35eabebdbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwZ3JhaW4lMjBzdG9yYWdlJTIwZ29kfGVufDF8fHx8MTc1NjYzNTYzNnww&ixlib=rb-4.1.0&q=80&w=200'
    },
    {
      name: '井神',
      category: '守护神',
      description: '守护水井的神灵，在部分地区至今仍有供奉的习俗',
      significance: '保佑水源清洁，饮水安全，家庭健康，生活无忧',
      placement: '靠近水源处，如厨房、浴室或水龙头附近',
      activities: ['取水用水', '水源管理', '清洁卫生', '洗漱准备', '水质保护'],
      imageUrl: 'https://images.unsplash.com/photo-1755511268111-9ebef96bc830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwd2VsbCUyMHdhdGVyJTIwZGVpdHl8ZW58MXx8fHwxNzU2NjM1NjQwfDA&ixlib=rb-4.1.0&q=80&w=200'
    },
    {
      name: '厕神',
      category: '守护神',
      description: '古代对厕所的保护神，因厕所被视为污秽之地，也需要有神明来镇守和净洁',
      significance: '净洁污秽，驱除病气，保佑家庭卫生，身体健康',
      placement: '卫生间外侧或附近，不直接面对厕所',
      activities: ['清洁消毒', '卫生管理', '空气净化', '除菌除臭', '健康维护'],
      imageUrl: 'https://images.unsplash.com/photo-1736688600613-c7168b2d5ac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZ29kJTIwb2YlMjB3ZWFsdGglMjBjaGluZXNlfGVufDF8fHx8MTc1NjYzNTA4N3ww&ixlib=rb-4.1.0&q=80&w=200'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      '守护神': 'bg-red-100 text-red-800',
      '神祇': 'bg-yellow-100 text-yellow-800',
      '四神兽': 'bg-blue-100 text-blue-800',
      '神兽': 'bg-purple-100 text-purple-800',
      '风水物品': 'bg-green-100 text-green-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">传统神明完全指南</h3>
      <p className="text-muted-foreground mb-6">
        了解传统四神兽、各路神祇和家宅守护神的风水作用，每次预测将为您推荐最适合的一位神明
      </p>
      
      <div className="grid gap-4">
        {commonEntities.map((entity, index) => (
          <Card key={index} className="p-4 border border-border/50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-shrink-0">
                <ImageWithFallback
                  src={entity.imageUrl}
                  alt={entity.name}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-medium">{entity.name}</h4>
                  <Badge className={getCategoryColor(entity.category)}>
                    {entity.category}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p>{entity.description}</p>
                  
                  <div>
                    <span className="font-medium text-muted-foreground">风水意义：</span>
                    <span className="ml-1">{entity.significance}</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-muted-foreground">摆放建议：</span>
                    <span className="ml-1">{entity.placement}</span>
                  </div>
                  
                  {entity.activities && (
                    <div>
                      <span className="font-medium text-muted-foreground">推荐活动：</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {entity.activities.map((activity, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">🧭 四神兽方位理论</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• <strong>青龙（东）</strong>：主事业学业，宜置书房办公区</li>
            <li>• <strong>朱雀（南）</strong>：主名声人际，宜置客厅会客区</li>
            <li>• <strong>白虎（西）</strong>：主财富权威，宜置财位保险柜旁</li>
            <li>• <strong>玄武（北）</strong>：主健康稳定，宜置卧室休息区</li>
          </ul>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">✨ 风水预测应用原则</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• 每次为您精选最适合的一位神明</li>
            <li>• 根据房间朝向和布局确定神明位置</li>
            <li>• 明确告知该位置最适合的活动类型</li>
            <li>• 考虑居住者的生辰八字和实际需求</li>
            <li>• 保持神明形象的清洁和完整</li>
            <li>• 根据神明特性选择合适的供奉位置</li>
            <li>• 按推荐活动优化空间功能布局</li>
            <li>• 定期调整位置以适应生活变化</li>
          </ul>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <h4 className="font-medium mb-2 text-blue-800">🎯 活动建议功能说明</h4>
          <p className="text-sm text-blue-700">
            除了预测神明位置，应用还会为您推荐该位置最适合进行的活动类型。
            这些建议基于传统风水理论，帮助您更好地规划和利用空间，让神明的庇护发挥最大效果。
          </p>
        </div>
      </div>
    </Card>
  );
}