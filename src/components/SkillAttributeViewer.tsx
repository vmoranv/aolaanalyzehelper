import React, { useState, useEffect } from 'react';
import {
  fetchSkillAttributes,
  checkHealth,
  type SkillAttribute,
  type SkillAttributesResponse,
} from '../services/aolaApi';

interface SkillAttributeViewerProps {
  className?: string;
}

export const SkillAttributeViewer: React.FC<SkillAttributeViewerProps> = ({ className }) => {
  const [skillAttributes, setSkillAttributes] = useState<SkillAttribute[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'unknown' | 'online' | 'offline'>('unknown');
  const [searchTerm, setSearchTerm] = useState('');

  // 检查服务器状态
  const checkServerStatus = async () => {
    try {
      await checkHealth();
      setServerStatus('online');
    } catch {
      setServerStatus('offline');
    }
  };

  // 获取技能属性数据
  const loadSkillAttributes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response: SkillAttributesResponse = await fetchSkillAttributes();

      if (response.success && response.data) {
        setSkillAttributes(response.data);
        setLastUpdated(response.timestamp);
        setServerStatus('online');
      } else {
        throw new Error(response.error || '获取数据失败');
      }
    } catch (err) {
      setError((err as Error).message);
      setServerStatus('offline');
    } finally {
      setLoading(false);
    }
  };

  // 过滤技能属性
  const filteredAttributes = skillAttributes.filter(
    ([id, name]) =>
      name.toLowerCase().includes(searchTerm.toLowerCase()) || id.toString().includes(searchTerm)
  );

  // 组件挂载时检查服务器状态
  useEffect(() => {
    checkServerStatus();
  }, []);

  return (
    <div className={`w-full bg-background p-5 ${className || ''}`}>
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-foreground mb-2">游戏数据解析器</h2>
        <div className="flex gap-5 text-sm text-muted-foreground">
          <span
            className={`font-medium ${
              serverStatus === 'online'
                ? 'text-success'
                : serverStatus === 'offline'
                  ? 'text-danger'
                  : 'text-muted'
            }`}
          >
            API状态:{' '}
            {serverStatus === 'online' ? '在线' : serverStatus === 'offline' ? '离线' : '未知'}
          </span>
          {lastUpdated && (
            <span className="text-muted-foreground">
              最后更新: {new Date(lastUpdated).toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <button
          onClick={loadSkillAttributes}
          disabled={loading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium 
                             hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed 
                             transition-colors duration-200"
        >
          {loading ? '解析中...' : '获取技能属性'}
        </button>

        <button
          onClick={checkServerStatus}
          className="px-4 py-2 bg-transparent text-primary border border-primary 
                             rounded-md text-sm font-medium hover:bg-primary hover:text-primary-foreground 
                             transition-colors duration-200"
        >
          检查API状态
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div
          className="bg-destructive/10 border border-destructive/20 text-destructive px-3 py-2 
                               rounded-md mb-5"
        >
          <strong>错误:</strong> {error}
        </div>
      )}

      {/* Data Section */}
      {skillAttributes.length > 0 && (
        <div className="mt-5">
          {/* Search Bar */}
          <div
            className="flex justify-between items-center mb-4 gap-2 
                                   flex-col sm:flex-row"
          >
            <input
              type="text"
              placeholder="搜索技能属性..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground
                                     text-sm focus:outline-none focus:ring-2 focus:ring-ring 
                                     focus:border-transparent w-full sm:w-auto"
            />
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              显示 {filteredAttributes.length} / {skillAttributes.length} 项
            </span>
          </div>

          {/* Attributes Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                                   gap-2 max-h-96 overflow-y-auto border border-border bg-card
                                   rounded-md p-4"
          >
            {filteredAttributes.map(([id, name]) => (
              <div
                key={id}
                className="flex items-center gap-2 px-3 py-2 
                                                   bg-secondary rounded-md border border-border hover:bg-accent transition-colors"
              >
                <span
                  className="bg-primary text-primary-foreground px-1.5 py-0.5 
                                               rounded text-xs font-bold min-w-8 text-center"
                >
                  {id}
                </span>
                <span className="text-sm text-foreground truncate">{name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
