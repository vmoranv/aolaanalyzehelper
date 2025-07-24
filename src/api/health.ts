export interface HealthResponse {
  success: boolean;
  status: string;
  service: string;
  timestamp: string;
  version: string;
}

/**
 * 获取应用健康状态
 */
export function getHealthStatus(): HealthResponse {
  return {
    success: true,
    status: 'ok',
    service: 'aola-parser',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  };
}
