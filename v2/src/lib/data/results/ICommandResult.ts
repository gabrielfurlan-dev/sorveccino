export type ICommandResult = {
  success: boolean;
  message: string;
  data: any;
};

export function Success(message: string, data: any = null): ICommandResult {
  return {
    success: true,
    message: message,
    data: data,
  };
}

export function Fail(message: string, data: any = null): ICommandResult {
  return { 
    success: false,
    message: message,
    data: data, 
  };
}