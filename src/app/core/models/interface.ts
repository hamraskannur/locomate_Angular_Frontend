export interface Credentials {
  mobile: string;
  password: string;
}

export interface registerResponse {
  message: string;
  status: Boolean;
}

export interface comment {
  comment: string;
  createdAt: string;
  likes: string[];
  postId: string;
  userId: string;
  username: string;
  _id: string;
  ProfileImg: string;
}
export interface loginResponse {
  message: string;
  token: string;
  status: Boolean;
  user:User
}
export interface User {
  _id: string;
  addPost: boolean;
  username: string;
  name: string;
  email: string;
  dob: string;
  phoneNo: number;
  password: string;
  verified: boolean;
  status: boolean;
  city: string;
  country: string;
  Address: string;
  description: string;
  ProfileImg: string;
  coverImg: string;
  public: boolean;
  PostalCode: number;
  Requests: string[];
  Followers: string[];
  Following: string[];
  saved: string[];
  read: boolean;
  notification: [
    {
      userId: string;
      postId: string;
    }
  ];
}

export interface Post {
  shortsCheck: boolean;
  _id: string;
  description: string;
  img: string[];
  likes: string[];
  status: boolean;
  shorts: string;
  edit: boolean;
  createdAt: string;
  userId: {
    username: string;
    name: string;
    _id: string;
    ProfileImg: string;
    public: boolean;
  };
}

export interface notification {
  postId: string;
  text: string;
  _id: string;
  userId: {
    username: string;
    name: string;
    _id: string;
    ProfileImg: string;
    public: boolean;
  };
}

export interface chat {
  createdAt: string;
  members: string[];
  updatedAt: string;
  _id: string;
}

export interface message{
  receiverId:string
  chatId: string;
  createdAt: string;
  senderId: string;
  text: string;
  updatedAt: string;
  _id: string;
}

