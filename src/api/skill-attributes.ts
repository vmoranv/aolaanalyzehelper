// 技能属性数据类型定义
export type SkillAttribute = [number, string];

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
  timestamp: string;
}

/**
 * 解析PMAttributeMap._skillAttributeData的函数
 */
export function extractSkillAttributeData(jsContent: string): SkillAttribute[] {
  try {
    // 使用多个正则表达式模式匹配不同格式
    const patterns = [
      /PMAttributeMap\._skillAttributeData\s*=\s*(\[[\s\S]*?\]);/,
      /PMAttributeMap\._skillAttributeData\s*=\s*(\[[\s\S]*?\])\s*[;}]/,
      /_skillAttributeData\s*=\s*(\[[\s\S]*?\]);/,
    ];

    let match: RegExpMatchArray | null = null;
    for (const pattern of patterns) {
      match = jsContent.match(pattern);
      if (match) break;
    }

    if (!match) {
      throw new Error('未找到PMAttributeMap._skillAttributeData数据');
    }

    // 清理并解析数组字符串
    const arrayStr = match[1]
      .replace(/\/\*[\s\S]*?\*\//g, '') // 移除块注释
      .replace(/\/\/.*$/gm, '') // 移除行注释
      .replace(/\s+/g, ' ') // 压缩空白
      .trim();

    // 使用Function构造器代替eval，相对更安全
    const skillAttributeData = new Function('return ' + arrayStr)() as SkillAttribute[];

    // 验证数据格式
    if (!Array.isArray(skillAttributeData)) {
      throw new Error('解析结果不是数组');
    }

    // 验证数组元素格式
    for (const item of skillAttributeData) {
      if (
        !Array.isArray(item) ||
        item.length !== 2 ||
        typeof item[0] !== 'number' ||
        typeof item[1] !== 'string'
      ) {
        throw new Error('数组元素格式不正确');
      }
    }

    return skillAttributeData;
  } catch (error) {
    throw new Error(`解析失败: ${(error as Error).message}`);
  }
}

/**
 * 获取技能属性数据的主函数
 */
export async function fetchSkillAttributesData(): Promise<ApiResponse<SkillAttribute[]>> {
  try {
    console.log('开始获取JavaScript文件...');

    // 根据环境选择不同的URL
    const isDevelopment = import.meta.env.DEV;
    const url = isDevelopment
      ? '/api/aola/h5/js/gamemain.js' // 开发环境使用Vite代理
      : '/api/proxy'; // 生产环境使用Vercel API

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP错误: ${response.status} ${response.statusText}`);
    }

    console.log('文件获取成功，开始解析...');
    const jsContent = await response.text();

    // 解析技能属性数据
    const skillAttributeData = extractSkillAttributeData(jsContent);

    console.log(`解析成功，找到${skillAttributeData.length}个技能属性`);

    // 返回解析结果
    return {
      success: true,
      data: skillAttributeData,
      count: skillAttributeData.length,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('解析错误:', (error as Error).message);

    return {
      success: false,
      error: (error as Error).message,
      timestamp: new Date().toISOString(),
    };
  }
}
