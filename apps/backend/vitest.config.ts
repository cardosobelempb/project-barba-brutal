// apps/backend/vitest.config.ts
import baseConfig from '@repo/vitest-config/vitest.base'
import { mergeConfig } from 'vitest/config'

export default mergeConfig(baseConfig, {
  test: {
    // customizações específicas do backend
  },
})
