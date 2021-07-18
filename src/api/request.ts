import request from "./axios";

export async function list(): Promise<any> {
  return request.get("/article/list");
}

export async function get(tid: string): Promise<any> {
  return request.get(`/article/get?tid=${tid}`);
}

export async function del(tid: string): Promise<any> {
  return request.delete(`/article/del?tid=${tid}`);
}

export async function save(data: any): Promise<any> {
  return request.post("/article/save", data);
}

export async function upload(file: any): Promise<any> {
  return request.post("/files/upload/free", file);
}
