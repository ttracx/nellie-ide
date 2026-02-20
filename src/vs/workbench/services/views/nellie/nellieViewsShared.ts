export type NellieView = 'chat' | 'agent' | 'search' | 'memory';

export const NellieChatExtensionId = 'workbench.view.extension.nellie-ideChat';
export const NellieSearchExtensionId = 'workbench.view.extension.nellie-ideSearch';
export const NellieMemoryExtensionId = 'workbench.view.extension.nellie-ideMemory';
export const NellieRooExtensionId = 'workbench.view.extension.nellie-ide-roo-cline';

export const NELLIE_VIEWS = {
  chat: NellieChatExtensionId,
  agent: NellieRooExtensionId,
  search: NellieSearchExtensionId,
  memory: NellieMemoryExtensionId
} as const;

export const auxiliaryBarAllowedViewContainerIDs = ['workbench.view.extension.nellie-ide', 'workbench.view.extension.nellie-ide-roo-cline', 'workbench.views.service.auxiliarybar'];
// auxiliary bar here is needed because additional views created by our integrations look like: workbench.views.service.auxiliarybar.c01af9cf-6360-4e6a-a725-4dfd9832755c
