export type Direction = "up" | "down" | "left" | "right";
export interface Beam {
  direction: Direction;
  x: number;
  y: number;
}

export class Node {
  tile: string;
  x: number;
  y: number;
  isMirror: boolean = false;
  isSplitter: boolean = false;
  isNormal: boolean = false;

  hasBeenEnergised: boolean = false;

  beamCache = new Set<Direction>();

  //refs
  up: Node | null = null;
  down: Node | null = null;
  left: Node | null = null;
  right: Node | null = null;

  constructor(tile: string, x: number, y: number) {
    this.tile = tile;
    this.x = x;
    this.y = y;
    this.isMirror = tile === "/" || tile === "\\";
    this.isSplitter = tile === "-" || tile === "|";
    this.isNormal = tile === ".";
  }

  getNextBeams(beam: Beam): Beam[] {
    if (!this.hasBeenEnergised) this.hasBeenEnergised = true;

    if (this.beamCache.has(beam.direction)) {
      return [];
    }
    this.beamCache.add(beam.direction);

    const beams: Beam[] = [];

    if (this.isMirror) {
      switch (beam.direction) {
        case "up":
          if (this.tile === "/" && this.right) {
            beams.push({ direction: "right", x: this.x + 1, y: this.y });
          } else if (this.tile === "\\" && this.left) {
            beams.push({ direction: "left", x: this.x - 1, y: this.y });
          }
          break;
        case "down":
          if (this.tile === "/" && this.left) {
            beams.push({ direction: "left", x: this.x - 1, y: this.y });
          } else if (this.tile === "\\" && this.right) {
            beams.push({ direction: "right", x: this.x + 1, y: this.y });
          }
          break;
        case "left":
          if (this.tile === "/" && this.down) {
            beams.push({ direction: "down", x: this.x, y: this.y + 1 });
          } else if (this.tile === "\\" && this.up) {
            beams.push({ direction: "up", x: this.x, y: this.y - 1 });
          }
          break;
        case "right":
          if (this.tile === "/" && this.up) {
            beams.push({ direction: "up", x: this.x, y: this.y - 1 });
          } else if (this.tile === "\\" && this.down) {
            beams.push({ direction: "down", x: this.x, y: this.y + 1 });
          }
          break;
      }
    } else if (this.isSplitter) {
      switch (beam.direction) {
        case "up":
          if (this.tile === "-") {
            if (this.left) {
              beams.push({ direction: "left", x: this.x - 1, y: this.y });
            }
            if (this.right) {
              beams.push({ direction: "right", x: this.x + 1, y: this.y });
            }
          } else if (this.tile === "|") {
            if (this.up) {
              beams.push({ direction: "up", x: this.x, y: this.y - 1 });
            }
          }
          break;
        case "down":
          if (this.tile === "-") {
            if (this.left) {
              beams.push({ direction: "left", x: this.x - 1, y: this.y });
            }
            if (this.right) {
              beams.push({ direction: "right", x: this.x + 1, y: this.y });
            }
          } else if (this.tile === "|") {
            if (this.down) {
              beams.push({ direction: "down", x: this.x, y: this.y + 1 });
            }
          }
          break;
        case "left":
          if (this.tile === "|") {
            if (this.up) {
              beams.push({ direction: "up", x: this.x, y: this.y - 1 });
            }
            if (this.down) {
              beams.push({ direction: "down", x: this.x, y: this.y + 1 });
            }
          } else if (this.tile === "-") {
            if (this.left) {
              beams.push({ direction: "left", x: this.x - 1, y: this.y });
            }
          }
          break;
        case "right":
          if (this.tile === "|") {
            if (this.up) {
              beams.push({ direction: "up", x: this.x, y: this.y - 1 });
            }
            if (this.down) {
              beams.push({ direction: "down", x: this.x, y: this.y + 1 });
            }
          } else if (this.tile === "-") {
            if (this.right) {
              beams.push({ direction: "right", x: this.x + 1, y: this.y });
            }
          }
          break;
      }
    } else {
      switch (beam.direction) {
        case "up":
          if (this.up) {
            beams.push({ direction: "up", x: this.x, y: this.y - 1 });
          }
          break;
        case "down":
          if (this.down) {
            beams.push({ direction: "down", x: this.x, y: this.y + 1 });
          }
          break;
        case "left":
          if (this.left) {
            beams.push({ direction: "left", x: this.x - 1, y: this.y });
          }
          break;
        case "right":
          if (this.right) {
            beams.push({ direction: "right", x: this.x + 1, y: this.y });
          }
          break;
      }
    }

    return beams;
  }

  resetNode() {
    this.hasBeenEnergised = false;
    this.beamCache.clear();
  }
}

export class Grid {
  private nodes: Map<string, Node> = new Map();
  width: number;
  height: number;

  constructor(gridData: string[][]) {
    this.height = gridData.length;
    this.width = gridData[0]?.length || 0;
    this.buildFromGrid(gridData);
  }

  private buildFromGrid(grid: string[][]): void {
    // First pass: create all nodes
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const node = new Node(grid[y][x], x, y);
        this.nodes.set(this.getKey(x, y), node);
      }
    }

    // Second pass: link nodes together
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const current = this.getNode(x, y)!;

        // Link to neighbors
        current.up = this.getNode(x, y - 1);
        current.down = this.getNode(x, y + 1);
        current.left = this.getNode(x - 1, y);
        current.right = this.getNode(x + 1, y);
      }
    }
  }

  private getKey(x: number, y: number): string {
    return `${x},${y}`;
  }

  getNode(x: number, y: number): Node | null {
    if (x >= this.width || y >= this.height || x < 0 || y < 0) {
      return null;
    }
    return this.nodes.get(this.getKey(x, y)) || null;
  }

  getStart(): Node | null {
    return this.getNode(0, 0);
  }

  getBeams(beam: Beam): Beam[] {
    const node = this.getNode(beam.x, beam.y);
    if (!node) return [];
    return node.getNextBeams(beam);
  }

  getEnergisedNodesCount(): number {
    let count = 0;
    for (const node of this.nodes.values()) {
      if (node.hasBeenEnergised) {
        count++;
      }
    }
    return count;
  }

  resetGrid() {
    for (const node of this.nodes.values()) {
      node.resetNode();
    }
  }
}
