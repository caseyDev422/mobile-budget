export type TrpcResponse<T> = {
  result?: { data: T };
  error?: { message?: string };
};
