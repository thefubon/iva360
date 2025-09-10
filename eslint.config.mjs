// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Отключаем правила, которые могут быть слишком строгими для Vue компонентов
    '@typescript-eslint/no-explicit-any': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    
    // Настройки для лучшего кода
    'no-console': 'warn',
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-unused-vars': 'off', // отключаем базовое правило
    '@typescript-eslint/no-unused-vars': 'warn',
    
    // Vue специфичные правила
    'vue/html-indent': ['error', 2],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'always'
    }],
    'vue/max-attributes-per-line': ['error', {
      'singleline': 3,
      'multiline': 1
    }]
  }
})