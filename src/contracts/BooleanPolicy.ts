import { ethers } from 'ethers';
// @ts-ignore
import { Contract, TransactionWrapper } from '../Contract';

export class BooleanPolicy extends Contract {
  constructor(addressOrName: string, providerOrSigner: ethers.Signer | ethers.providers.Provider) {
    super(new.target.abi, addressOrName, providerOrSigner);
  }

  /**
   * `BooleanPolicy` contract call for the `position` function.
   *
   * @contract BooleanPolicy
   * @signature function position() pure returns (uint8)
   */
  position: ($$overrides?: ethers.CallOverrides) => Promise<number>;

  /**
   * `BooleanPolicy` contract transaction for `rule` function.
   *
   * @contract BooleanPolicy
   * @signature function rule(bytes4,address[5],uint256[3],bytes32) returns (bool)
   */
  rule: (
    sig: string | ethers.utils.BytesLike,
    addresses: [string, string, string, string, string],
    values: [ethers.BigNumber, ethers.BigNumber, ethers.BigNumber],
    identifier: string | ethers.utils.BytesLike,
  ) => TransactionWrapper<ethers.Overrides>;

  static abi: string[] = [
    'function position() pure returns (uint8)',
    'function rule(bytes4 sig, address[5] addresses, uint256[3] values, bytes32 identifier) returns (bool)',
  ];
}