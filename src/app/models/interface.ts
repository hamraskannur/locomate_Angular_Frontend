export interface Credentials {
  mobile: string;
  password: string;
}

export interface registerResponse {
  message: string;
  status: Boolean;
}

export interface loginResponse {
  message: string;
  token: string;
  status: Boolean;
}
export interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
  dob: Date;
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
  public: Boolean;
  PostalCode: number;
  Requests: string[];
  Followers: string[];
  Following: string[];
  saved: string[];
  read: Boolean;
  notification: [
    {
      userId: string;
      postId: string;
    }
  ];
}

export interface Post {
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
