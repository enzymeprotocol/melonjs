import { Contract } from '../../Contract';
import { Address } from '../../Address';
import { AmguConsumerAbi } from '../../abis/AmguConsumer.abi';

export class AmguConsumer extends Contract {
  public static readonly abi = AmguConsumerAbi;

  public async getAmguToken(block?: number) {
    const result = await this.makeCall<Address>('mlnToken', undefined, block);
    return result;
  }

  public async getEngine(block?: number) {
    return await this.makeCall<Address>('engine', undefined, block);
  }

  public async getPriceSource(block?: number) {
    return await this.makeCall<Address>('priceSource', undefined, block);
  }

  public async getVersion(block?: number) {
    return await this.makeCall<Address>('version', undefined, block);
  }
}
