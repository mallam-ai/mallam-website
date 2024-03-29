export interface MChat {
  id: string;
  teamId: string;
  userId: string;
  title: string;
  createdAt: string;
  histories?: MHistory[];
}

export function defaultChat(): MChat {
  return {
    id: "",
    teamId: "",
    userId: "",
    title: "",
    createdAt: "",
    histories: [],
  };
}

export interface MHistory {
  id: string;
  role: string;
  status: string;
  content: string;
  contentHtml: string;
  createdAt: "";
}

export interface MDocument {
  id: string;
  teamId: string;
  status: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: string;
  sentences?: Array<{
    id: string;
    content: string;
    isAnalyzed: boolean;
    highlighted?: boolean;
  }>;
}

export const DocumentStatus = {
  Created: "created",
  Segmented: "segmented",
  Analyzed: "analyzed",
  Failed: "failed",
};

export function emptyDocument(): MDocument {
  return {
    id: "",
    teamId: "",
    status: DocumentStatus.Created,
    title: "",
    content: "",
    createdBy: "",
    createdAt: "",
    sentences: [],
  };
}

export interface Team {
  id: string;
  displayName: string;
  createdBy: string;
  createdAt: string;
  membershipId: string;
  membershipRole: string;
  membershipCreatedAt: string;
}

export function emptyTeam(): Team {
  return {
    id: "",
    displayName: "",
    createdBy: "",
    createdAt: "",
    membershipId: "",
    membershipRole: "",
    membershipCreatedAt: "",
  };
}

export interface User {
  id: string;
  vendor: string;
  vendorUserId: string;
  displayName: string;
  createdAt: string;
}

export function emptyUser(): User {
  return {
    id: "",
    vendor: "",
    vendorUserId: "",
    displayName: "",
    createdAt: "",
  };
}

export function createUserAvatarURL(
  vendor?: string,
  vendorUserId?: string
): string {
  if (vendor == "github" && vendorUserId) {
    return `https://avatars.githubusercontent.com/u/${vendorUserId}?v=4`;
  }
  return "https://avatars.githubusercontent.com/u/51222892?v=4";
}
