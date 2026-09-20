import type { ContentStatus } from '../types/content'

export const CONTENT_STATUS_LABELS: Record<ContentStatus, string> = {
  planned: 'Planned',
  'in-progress': 'In progress',
  published: 'Published',
}
