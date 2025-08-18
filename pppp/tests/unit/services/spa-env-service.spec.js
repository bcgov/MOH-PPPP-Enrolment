import spaEnvService from "@/services/spa-env-service";
import axios from "axios";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(() => {
      return Promise.resolve();
    }),
  },
}));

const mockResponse = {
  data: {
    SPA_ENV_PPPP_MAINTENANCE_FLAG: "false",
    SPA_ENV_PPPP_MAINTENANCE_START: "2019-06-30 6:50:00 PM",
    SPA_ENV_PPPP_MAINTENANCE_END: "2020-01-24 12:00:00 PM",
    SPA_ENV_PPPP_MAINTENANCE_MESSAGE: "System will be down from time A to time B.",
  },
  status: 200,
  statusText: "OK",
};

axios.post.mockImplementation(() => Promise.resolve(mockResponse));

describe("SpaEnvService test", () => {
  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("renders", () => {
    expect(spaEnvService.loadEnvs()).toBeDefined();
  });
});

describe("SpaEnvService loadEnvs()", () => {
  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("returns an object", async () => {
    const result = await expect(spaEnvService.loadEnvs());
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(typeof result).toBe("object");
  });
});
