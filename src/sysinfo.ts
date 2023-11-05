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

interface ISystemInformation {
  cpu: Systeminformation.CpuData;
  system: Systeminformation.SystemData;
  mem: Systeminformation.MemData;
  os: Systeminformation.OsData;
  currentLoad: Systeminformation.CurrentLoadData;
  processes: Systeminformation.ProcessesData;
  diskLayout: Systeminformation.DiskLayoutData[];
  networkInterfaces: Systeminformation.NetworkInterfacesData[];
}

async function getSystemInformation(): Promise<ISystemInformation> {
  // getAll is not recommended, e.g. on Windows, it takes almost 20s to
  // answer for the first execution.
  const sysinfo: ISystemInformation = {
    cpu: await cpu(),
    system: await system(),
    mem: await mem(),
    os: await osInfo(),
    currentLoad: await currentLoad(),
    processes: await processes(),
    diskLayout: await diskLayout(),
    networkInterfaces: await getNetworkInterfacesInfo(),
  };

  return sysinfo;
}

async function getNetworkInterfacesInfo(): Promise<Systeminformation.NetworkInterfacesData[]> {
  // Weird function, just to get the types right for TS.
  // So of course, it's going to be bad coding.

  // Copied Promise way of coding from systeminformation code.
  return new Promise(async (resolve) => {
    // We NEED to omit the interface here, because we know we can't respect it.
    // This is the "bad coding just to fit the interfaces"
    const badInterface = await networkInterfaces();

    const networkInfo: Systeminformation.NetworkInterfacesData[] = [];
    if (badInterface instanceof Array) {
      // The left hand-side of for ...of cannot contain Type Annotations
      // otherwise, would contain Systeminformation.NetworkInterfacesData
      for (const val of badInterface) {
        networkInfo.push(val);
      }
    } else {
      networkInfo.push(badInterface);
    }

      resolve(networkInfo);
  });
}

// Est-ce que c'est mieux d'exporter ensemble ou d'exporter devant chaque fonction concernée.
export { ISystemInformation, getSystemInformation };
