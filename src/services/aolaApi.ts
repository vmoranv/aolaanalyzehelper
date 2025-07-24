import {
  fetchSkillAttributesData,
  type SkillAttribute,
  type ApiResponse,
} from '../api/skill-attributes';
import { getHealthStatus, type HealthResponse } from '../api/health';

// 重新导出类型
export type { SkillAttribute };

export interface SkillAttributesResponse extends ApiResponse<SkillAttribute[]> {
  count: number;
}

/**
 * 获取技能属性数据
 */
export async function fetchSkillAttributes(): Promise<SkillAttributesResponse> {
  try {
    const result = await fetchSkillAttributesData();

    if (result.success && result.data) {
      return {
        ...result,
        count: result.data.length,
      } as SkillAttributesResponse;
    } else {
      throw new Error(result.error || '获取数据失败');
    }
  } catch (error) {
    throw new Error(`获取技能属性失败: ${(error as Error).message}`);
  }
}

/**
 * 健康检查
 */
export async function checkHealth(): Promise<HealthResponse> {
  try {
    return getHealthStatus();
  } catch (error) {
    throw new Error(`健康检查失败: ${(error as Error).message}`);
  }
}

/**
 * 将技能属性数组转换为Map对象，便于查找
 */
export function skillAttributesToMap(attributes: SkillAttribute[]): Map<number, string> {
  return new Map(attributes);
}

/**
 * 根据ID获取技能属性名称
 */
export function getSkillAttributeName(
  attributes: SkillAttribute[],
  id: number
): string | undefined {
  const attribute = attributes.find(([attrId]) => attrId === id);
  return attribute?.[1];
}
