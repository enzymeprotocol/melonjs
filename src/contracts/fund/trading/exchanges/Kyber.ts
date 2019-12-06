import BigNumber from 'bignumber.js';
import { Address } from '../../../../Address';
import { ValidationError } from '../../../../errors/ValidationError';
import { sameAddress } from '../../../../utils/sameAddress';
import { Trading } from '../Trading';
import { encodeFunctionSignature } from '../../../../utils/encodeFunctionSignature';
import { ExchangeAdapterAbi } from '../../../../abis/ExchangeAdapter.abi';
import { zeroAddress } from '../../../../utils/zeroAddress';

export interface TakeOrderKyber {
  kyberAddress: Address;
  makerAsset: Address;
  takerAsset: Address;
  makerQuantity: BigNumber;
  takerQuantity: BigNumber;
}

export class KyberNotRegisteredWithFundError extends ValidationError {
  public readonly name = 'KyberNotRegisteredWithFundError';

  constructor(
    public readonly kyberAddress: Address,
    message: string = 'Kyber Exchange is not registered for this fund.',
  ) {
    super(message);
  }
}

export class Kyber {
  constructor(public readonly trading: Trading) {}

  /**
   * Take order on Kyber
   *
   * @param from The address of the sender
   * @param args The arguments as [[TakeOrderKyber]]
   */
  public async takeOrder(from: Address, args: TakeOrderKyber) {
    const exchangeInfo = await this.trading.getExchangeInfo();
    const exchangeIndex = exchangeInfo.findIndex(exchange => sameAddress(exchange.exchange, args.kyberAddress));

    if (exchangeIndex === -1) {
      throw new KyberNotRegisteredWithFundError(args.kyberAddress);
    }

    const methodArgs = {
      exchangeIndex,
      methodSignature: encodeFunctionSignature(ExchangeAdapterAbi, 'takeOrder'),
      orderAddresses: [zeroAddress, zeroAddress, args.makerAsset, args.takerAsset, zeroAddress, zeroAddress],
      orderValues: [
        args.makerQuantity,
        args.takerQuantity,
        new BigNumber(0),
        new BigNumber(0),
        new BigNumber(0),
        new BigNumber(0),
        args.takerQuantity,
        new BigNumber(0),
      ],
      identifier: '0x0',
      makerAssetData: '0x0',
      takerAssetData: '0x0',
      signature: '0x0',
    };

    return this.trading.callOnExchange(from, methodArgs);
  }
}