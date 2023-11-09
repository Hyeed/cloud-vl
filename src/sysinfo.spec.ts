import {
  Systeminformation,
  cpu,
  currentLoad,
  diskLayout,
  mem,
  networkInterfaces,
  osInfo,
  processes,
  system,
} from 'systeminformation';
import { ISystemInformation, getSystemInformation } from './sysinfo';

// On est sur des tests un peu crade, on ne mock pas l'intégralité du module
// donc on ne va pas essayer de faire respecter même le type du module.
// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock("systeminformation", () => ({
  cpu: jest.fn(async () => {
    return jest.fn();
  }),

  currentLoad: jest.fn(async () => {
    return jest.fn();
  }),

  diskLayout: jest.fn(async () => {
    return jest.fn();
  }),

  mem: jest.fn(async () => {
    return jest.fn();
  }),

  networkInterfaces: jest.fn(async () => {
    return jest.fn();
  }),

  osInfo: jest.fn(async () => {
    return jest.fn();
  }),

  processes: jest.fn(async () => {
    return jest.fn();
  }),

  system: jest.fn(async () => {
    return jest.fn();
  })
}));

// Si on avait utilisé une classe à instantier, on aurait pu quand même instantier la classe et continuer avec les tests
// Genre vraiment utiliser tout ça comme un shim.
// beforeEach(() => {
//   // Clear all instances and calls to constructor and all methods:
//   SoundPlayer.mockClear();
// });

// Faire un test qui vérifie qu'on a bien export la fonction ? (enfin c'est testé par l'exécution du code ça en fait...)
describe('function calls in getSystemInformation', () => {
  it('should call systeminformation.cpu"', async () => {
    // Needed when testing asynchronous code, to make sure all methods are actually called.
    expect.assertions(1);
    await getSystemInformation();
    expect(cpu).toHaveBeenCalledWith();
  });

  it('should call systeminformation.currentLoad"', async () => {
    expect.assertions(1);
    await getSystemInformation();
    expect(currentLoad).toHaveBeenCalledWith();
  });

  it('should call systeminformation.diskLayout"', async () => {
    expect.assertions(1);
    await getSystemInformation();
    expect(diskLayout).toHaveBeenCalledWith();
  });

  it('should call systeminformation.mem"', async () => {
    expect.assertions(1);
    await getSystemInformation();
    expect(mem).toHaveBeenCalledWith();
  });

  it('should call systeminformation.networkInterfaces"', async () => {
    expect.assertions(1);
    await getSystemInformation();
    expect(networkInterfaces).toHaveBeenCalledWith();
  });

  it('should call systeminformation.osInfo"', async () => {
    expect.assertions(1);
    await getSystemInformation();
    expect(osInfo).toHaveBeenCalledWith();
  });

  it('should call systeminformation.processes"', async () => {
    expect.assertions(1);
    await getSystemInformation();
    expect(processes).toHaveBeenCalledWith();
  });

  it('should call systeminformation.system"', async () => {
    expect.assertions(1);
    await getSystemInformation();
    expect(system).toHaveBeenCalledWith();
  });
});

// Même si on reste en TS pour nos codes, on ne peut pas vérifier que des objets sont conformes à une interface...
// Et quand une fonction n'est pas export par un module, on ne peut pas l'utiliser dans le test.
// Bon tant pis à regarder plus tard.
