/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_API: string;
  readonly VITE_APP_NAME: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv
}
