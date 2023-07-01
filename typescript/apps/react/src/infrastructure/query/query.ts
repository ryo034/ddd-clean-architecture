import { useQuery } from "@tanstack/react-query"
import { ErrorHandler } from "~/infrastructure/error/handler"

export interface QueryResult<T> {
  isLoading: boolean
  error: Error | null
  data: T | undefined
}

export function useCustomQuery<TData>(queryKey: string, fetchFunction: () => Promise<TData>): QueryResult<TData> {
  const { data, error, isLoading } = useQuery<TData, Error>([queryKey], fetchFunction)
  return {
    data,
    error,
    isLoading: isLoading
  }
}

export function useQueryClientWithErrorHandling<TData>(
  queryKey: string,
  fetchFunction: () => Promise<TData>
): QueryResult<TData> {
  try {
    return useCustomQuery(queryKey, fetchFunction)
  } catch (e) {
    return {
      isLoading: false,
      data: undefined,
      error: ErrorHandler.adapt(e)
    }
  }
}
