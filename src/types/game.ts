export type Role = "mc" | "contestant" | "viewer" | "controller";

export type ContestantPosition = "1" | "2" | "3" | "4";

export interface Contestant {
  id: string; 
  position: ContestantPosition;
  name: string;
  score: number;
  isLockedOut: boolean;
}

export type GameRound = "KHOI_DONG" | "VCNV" | "TANG_TOC" | "VE_DICH";

export interface BuzzerState {
  isOpen: boolean; 
  buzzedBy: {
    position: ContestantPosition;
    name: string;
    timestamp: number; 
  } | null;
}

export interface GameState {
  currentRound: GameRound;
  currentQuestionIndex: number;
  contestants: Record<ContestantPosition, Contestant>;
  buzzer: BuzzerState;
  timer: {
    duration: number; 
    remaining: number;
    isRunning: boolean;
  };
}

// Socket Events Definitions
export interface ServerToClientEvents {
  "game:stateUpdate": (state: GameState) => void;
  "buzzer:opened": () => void;
  "buzzer:closed": () => void;
  "buzzer:triggered": (data: {
    position: ContestantPosition;
    name: string;
    timestamp: number;
  }) => void;
  "buzzer:reset": () => void;
  "timer:tick": (remaining: number) => void;
}

export interface ClientToServerEvents {
  "auth:join": (payload: {
    role: Role;
    position?: ContestantPosition;
    name?: string;
  }) => void;
  "buzzer:press": () => void;
  "controller:openBuzzer": () => void;
  "controller:closeBuzzer": () => void;
  "controller:resetBuzzer": () => void;
  "controller:updateScore": (payload: {
    position: ContestantPosition;
    delta: number;
  }) => void;
  "controller:setRound": (round: GameRound) => void;
}
