import { User } from "@/utils/interfaces/user";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setCookie(name: string, value: string, days: number): void {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + expirationDate.toUTCString();
  document.cookie = name + "=" + value + "; " + expires;
}

export function removeCookie(name: string) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function getCookie(name: string, cookie: string): string | null {
  const cookieString = cookie;
  const cookies = cookieString.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
}

export function truncateString(
  inputString: string,
  charLimit: number,
  endingString: string
): string {
  if (inputString.length <= charLimit) {
    return inputString;
  } else {
    return inputString.slice(0, charLimit) + endingString;
  }
}

export const getSender = (currentUser: User, users: User[]) => {
  return users[0]._id === currentUser._id ? users[1].name : users[0].name;
};

// Utility function to set data in local storage
export const setLocalStorageItem = <T extends User>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting local storage item:", error);
  }
};

// Utility function to get data from local storage
export const getLocalStorageItem = <T extends { user: User } | null>(
  key: "user" | string
): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error getting local storage item:", error);
    return null as T;
  }
};

export function isCurrentUserSender(senderId: string) {
  const currentUser = getLocalStorageItem("user");
  console.log(currentUser?.user._id, senderId);

  return currentUser?.user._id === senderId;
}

export function getOtherUser(users: User[]) {
  console.log("first");
  const data = getLocalStorageItem("user");
  const currentUser = data?.user._id;
  return currentUser === users[0]._id ? users[1] : users[0];
}

export function getCurrentUser() {
  return getLocalStorageItem("user");
}

export function millisecondsToDate<T extends string | Date | number>(
  milliseconds: T
) {
  // Create a new Date object with the milliseconds
  const date = new Date(milliseconds).toLocaleTimeString();

  // Return the date
  return date === "Invalid Date" ? "" : date;
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// generate thumbnail for the image
export const generateThumbnail = (
  file: File,
  maxWidth = 200,
  maxHeight = 200
) => {
  if (!file) return;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        if (!ctx) throw Error("ctx is Null");
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toDataURL("image/jpeg", (dataUrl: string) => {
          resolve(dataUrl);
        });
      };
      img.src = e.target.result;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateVideoThumbnail = (file: File, time = 0) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = URL.createObjectURL(file);

    video.addEventListener("loadeddata", () => {
      video.currentTime = time;
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toDataURL("image/jpeg", (dataUrl: string) => {
        resolve(dataUrl);
      });
    });

    video.addEventListener("error", (e) => reject(e));
  });
};
