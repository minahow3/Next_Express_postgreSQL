import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn", // 🚨 エラーではなく警告に変更
        { 
          "argsIgnorePattern": "^_", // `_` で始まる未使用の引数は許可
          "varsIgnorePattern": "^(__webpack_require__|exports|__unused_webpack_module)$" // Webpack 系変数は無視
        }
      ],
    },
  },
];

export default eslintConfig;
