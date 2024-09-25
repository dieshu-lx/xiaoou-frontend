module.exports = {
  // 使用的插件
  plugins: ['unused-imports', 'prettier', 'react', '@typescript-eslint', 'import', '@emotion'],
  
  // 扩展的配置
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  
  // 解析器选项
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  
  // 设置
  settings: {
    react: {
      version: 'detect', // 自动检测React版本
    },
    'import/resolver': {
      typescript: {
        // 这里可以指定 tsconfig.json 的路径，通常为 './tsconfig.json'
        project: './tsconfig.json',
      },
    },
  },
  
  // 规则配置
  rules: {
    'no-var': 'error', // 禁止使用var
    '@typescript-eslint/naming-convention': 'off', // 命名规范警告
    '@typescript-eslint/no-explicit-any': 'error', // 禁止使用any类型
    'unused-imports/no-unused-imports': 'error', // 禁止未使用的导入
    'prettier/prettier': 'error', // 强制使用prettier格式化
    '@emotion/jsx-import': 'error', // emotion JSX导入规则
    '@emotion/pkg-renaming': 'error', // emotion包重命名规则
    'react/display-name': 'off', // 关闭display-name规则
    'import/order': [ // 导入顺序规则
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
    'unused-imports/no-unused-vars': [ // 未使用变量规则
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'react/self-closing-comp': 'error', // 强制自闭合标签
    'react/prop-types': 'off', // 关闭prop-types检查
  },
  
  // 忽略的文件和目录
  ignorePatterns: ['node_modules', 'dist', '**/*.cjs', '*.md'],
  
  // 特定文件的覆盖规则
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
    },
  ],
};
