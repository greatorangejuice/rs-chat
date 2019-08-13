export interface DataModel {
  from: string;
  message: string;
  id: string;
  time: number;
}

export interface RequestMessage {
  from: string;
  message: string;
}

export class Message {
  constructor(
    public from: string,
    public message: string,
) {}

}

