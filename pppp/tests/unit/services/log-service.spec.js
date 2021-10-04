import logService from "@/services/log-service";
import axios from "axios";
import { getBCTimestamp } from "common-lib-vue";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(() => {
    return Promise.resolve();
  }),
}));

const mockResponse = {};

axios.post.mockImplementation(() => Promise.resolve(mockResponse));

describe("LogService test", () => {
    afterEach(() => {
      jest.resetModules();
      jest.clearAllMocks();
    });
  
    it("renders", () => {
      expect(logService).toBeDefined();
    });
  });