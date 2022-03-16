/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface KlaybankIncentivesControllerInterface extends ethers.utils.Interface {
  functions: {
    "EMISSION_MANAGER()": FunctionFragment;
    "PERCENTAGE_FACTOR()": FunctionFragment;
    "PRECISION()": FunctionFragment;
    "REVISION()": FunctionFragment;
    "REWARD_TOKEN()": FunctionFragment;
    "SECONDS_OF_ONE_MONTH()": FunctionFragment;
    "STAKED_TOKEN()": FunctionFragment;
    "assets(address)": FunctionFragment;
    "claimRewards(address[],uint256,address)": FunctionFragment;
    "claimRewardsOnBehalf(address[],uint256,address,address)": FunctionFragment;
    "configureAssets(address[],uint256[][],uint16[])": FunctionFragment;
    "getAssetData(address)": FunctionFragment;
    "getClaimer(address)": FunctionFragment;
    "getDistributionEndTimestamp(address)": FunctionFragment;
    "getDistributionStartTimestamp(address)": FunctionFragment;
    "getRewardsBalance(address[],address)": FunctionFragment;
    "getUserAssetData(address,address)": FunctionFragment;
    "getUserUnclaimedRewards(address)": FunctionFragment;
    "handleAction(address,uint256,uint256)": FunctionFragment;
    "initialize()": FunctionFragment;
    "setClaimer(address,address)": FunctionFragment;
    "setDistributionStartTimestamp(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "EMISSION_MANAGER",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PERCENTAGE_FACTOR",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "PRECISION", values?: undefined): string;
  encodeFunctionData(functionFragment: "REVISION", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "REWARD_TOKEN",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SECONDS_OF_ONE_MONTH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "STAKED_TOKEN",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "assets", values: [string]): string;
  encodeFunctionData(
    functionFragment: "claimRewards",
    values: [string[], BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "claimRewardsOnBehalf",
    values: [string[], BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "configureAssets",
    values: [string[], BigNumberish[][], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getAssetData",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "getClaimer", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getDistributionEndTimestamp",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getDistributionStartTimestamp",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getRewardsBalance",
    values: [string[], string]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserAssetData",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserUnclaimedRewards",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "handleAction",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setClaimer",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setDistributionStartTimestamp",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "EMISSION_MANAGER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PERCENTAGE_FACTOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "PRECISION", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "REVISION", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "REWARD_TOKEN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SECONDS_OF_ONE_MONTH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "STAKED_TOKEN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "assets", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimRewardsOnBehalf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "configureAssets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAssetData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getClaimer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getDistributionEndTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDistributionStartTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRewardsBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserAssetData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserUnclaimedRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "handleAction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setClaimer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setDistributionStartTimestamp",
    data: BytesLike
  ): Result;

  events: {
    "AssetConfigUpdated(address,uint256[],uint16)": EventFragment;
    "AssetIndexUpdated(address,uint256)": EventFragment;
    "ClaimerSet(address,address)": EventFragment;
    "DistributionEndUpdated(uint256)": EventFragment;
    "DistributionStartUpdated(uint256)": EventFragment;
    "RewardsAccrued(address,uint256)": EventFragment;
    "RewardsClaimed(address,address,address,uint256)": EventFragment;
    "UserIndexUpdated(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AssetConfigUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AssetIndexUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ClaimerSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DistributionEndUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DistributionStartUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RewardsAccrued"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RewardsClaimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UserIndexUpdated"): EventFragment;
}

export type AssetConfigUpdatedEvent = TypedEvent<
  [string, BigNumber[], number] & {
    asset: string;
    monthlyEmissionPerSecond: BigNumber[];
    shareRatio: number;
  }
>;

export type AssetIndexUpdatedEvent = TypedEvent<
  [string, BigNumber] & { asset: string; index: BigNumber }
>;

export type ClaimerSetEvent = TypedEvent<
  [string, string] & { user: string; claimer: string }
>;

export type DistributionEndUpdatedEvent = TypedEvent<
  [BigNumber] & { newDistributionEnd: BigNumber }
>;

export type DistributionStartUpdatedEvent = TypedEvent<
  [BigNumber] & { newDistributionStart: BigNumber }
>;

export type RewardsAccruedEvent = TypedEvent<
  [string, BigNumber] & { user: string; amount: BigNumber }
>;

export type RewardsClaimedEvent = TypedEvent<
  [string, string, string, BigNumber] & {
    user: string;
    to: string;
    claimer: string;
    amount: BigNumber;
  }
>;

export type UserIndexUpdatedEvent = TypedEvent<
  [string, string, BigNumber] & {
    user: string;
    asset: string;
    index: BigNumber;
  }
>;

export class KlaybankIncentivesController extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: KlaybankIncentivesControllerInterface;

  functions: {
    EMISSION_MANAGER(overrides?: CallOverrides): Promise<[string]>;

    PERCENTAGE_FACTOR(overrides?: CallOverrides): Promise<[BigNumber]>;

    PRECISION(overrides?: CallOverrides): Promise<[number]>;

    REVISION(overrides?: CallOverrides): Promise<[BigNumber]>;

    REWARD_TOKEN(overrides?: CallOverrides): Promise<[string]>;

    SECONDS_OF_ONE_MONTH(overrides?: CallOverrides): Promise<[BigNumber]>;

    STAKED_TOKEN(overrides?: CallOverrides): Promise<[string]>;

    assets(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number, BigNumber, BigNumber] & {
        index: BigNumber;
        shareRatio: number;
        lastUpdateTimestamp: BigNumber;
        distributionStartTimestamp: BigNumber;
      }
    >;

    claimRewards(
      assets: string[],
      amount: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimRewardsOnBehalf(
      assets: string[],
      amount: BigNumberish,
      user: string,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    configureAssets(
      assets: string[],
      assetMonthlyEmissionPerSecond: BigNumberish[][],
      shareRatios: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAssetData(
      asset: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber[], number, BigNumber, BigNumber]>;

    getClaimer(user: string, overrides?: CallOverrides): Promise<[string]>;

    getDistributionEndTimestamp(
      asset: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getDistributionStartTimestamp(
      asset: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getRewardsBalance(
      assets: string[],
      user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getUserAssetData(
      user: string,
      asset: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getUserUnclaimedRewards(
      _user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    handleAction(
      user: string,
      totalSupply: BigNumberish,
      userBalance: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setClaimer(
      user: string,
      caller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setDistributionStartTimestamp(
      asset: string,
      distributionStartTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  EMISSION_MANAGER(overrides?: CallOverrides): Promise<string>;

  PERCENTAGE_FACTOR(overrides?: CallOverrides): Promise<BigNumber>;

  PRECISION(overrides?: CallOverrides): Promise<number>;

  REVISION(overrides?: CallOverrides): Promise<BigNumber>;

  REWARD_TOKEN(overrides?: CallOverrides): Promise<string>;

  SECONDS_OF_ONE_MONTH(overrides?: CallOverrides): Promise<BigNumber>;

  STAKED_TOKEN(overrides?: CallOverrides): Promise<string>;

  assets(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, number, BigNumber, BigNumber] & {
      index: BigNumber;
      shareRatio: number;
      lastUpdateTimestamp: BigNumber;
      distributionStartTimestamp: BigNumber;
    }
  >;

  claimRewards(
    assets: string[],
    amount: BigNumberish,
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimRewardsOnBehalf(
    assets: string[],
    amount: BigNumberish,
    user: string,
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  configureAssets(
    assets: string[],
    assetMonthlyEmissionPerSecond: BigNumberish[][],
    shareRatios: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAssetData(
    asset: string,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber[], number, BigNumber, BigNumber]>;

  getClaimer(user: string, overrides?: CallOverrides): Promise<string>;

  getDistributionEndTimestamp(
    asset: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getDistributionStartTimestamp(
    asset: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getRewardsBalance(
    assets: string[],
    user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getUserAssetData(
    user: string,
    asset: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getUserUnclaimedRewards(
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  handleAction(
    user: string,
    totalSupply: BigNumberish,
    userBalance: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initialize(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setClaimer(
    user: string,
    caller: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setDistributionStartTimestamp(
    asset: string,
    distributionStartTimestamp: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    EMISSION_MANAGER(overrides?: CallOverrides): Promise<string>;

    PERCENTAGE_FACTOR(overrides?: CallOverrides): Promise<BigNumber>;

    PRECISION(overrides?: CallOverrides): Promise<number>;

    REVISION(overrides?: CallOverrides): Promise<BigNumber>;

    REWARD_TOKEN(overrides?: CallOverrides): Promise<string>;

    SECONDS_OF_ONE_MONTH(overrides?: CallOverrides): Promise<BigNumber>;

    STAKED_TOKEN(overrides?: CallOverrides): Promise<string>;

    assets(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number, BigNumber, BigNumber] & {
        index: BigNumber;
        shareRatio: number;
        lastUpdateTimestamp: BigNumber;
        distributionStartTimestamp: BigNumber;
      }
    >;

    claimRewards(
      assets: string[],
      amount: BigNumberish,
      to: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claimRewardsOnBehalf(
      assets: string[],
      amount: BigNumberish,
      user: string,
      to: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    configureAssets(
      assets: string[],
      assetMonthlyEmissionPerSecond: BigNumberish[][],
      shareRatios: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    getAssetData(
      asset: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber[], number, BigNumber, BigNumber]>;

    getClaimer(user: string, overrides?: CallOverrides): Promise<string>;

    getDistributionEndTimestamp(
      asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDistributionStartTimestamp(
      asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRewardsBalance(
      assets: string[],
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserAssetData(
      user: string,
      asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserUnclaimedRewards(
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    handleAction(
      user: string,
      totalSupply: BigNumberish,
      userBalance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    initialize(overrides?: CallOverrides): Promise<void>;

    setClaimer(
      user: string,
      caller: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setDistributionStartTimestamp(
      asset: string,
      distributionStartTimestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AssetConfigUpdated(address,uint256[],uint16)"(
      asset?: string | null,
      monthlyEmissionPerSecond?: null,
      shareRatio?: null
    ): TypedEventFilter<
      [string, BigNumber[], number],
      {
        asset: string;
        monthlyEmissionPerSecond: BigNumber[];
        shareRatio: number;
      }
    >;

    AssetConfigUpdated(
      asset?: string | null,
      monthlyEmissionPerSecond?: null,
      shareRatio?: null
    ): TypedEventFilter<
      [string, BigNumber[], number],
      {
        asset: string;
        monthlyEmissionPerSecond: BigNumber[];
        shareRatio: number;
      }
    >;

    "AssetIndexUpdated(address,uint256)"(
      asset?: string | null,
      index?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { asset: string; index: BigNumber }
    >;

    AssetIndexUpdated(
      asset?: string | null,
      index?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { asset: string; index: BigNumber }
    >;

    "ClaimerSet(address,address)"(
      user?: string | null,
      claimer?: string | null
    ): TypedEventFilter<[string, string], { user: string; claimer: string }>;

    ClaimerSet(
      user?: string | null,
      claimer?: string | null
    ): TypedEventFilter<[string, string], { user: string; claimer: string }>;

    "DistributionEndUpdated(uint256)"(
      newDistributionEnd?: null
    ): TypedEventFilter<[BigNumber], { newDistributionEnd: BigNumber }>;

    DistributionEndUpdated(
      newDistributionEnd?: null
    ): TypedEventFilter<[BigNumber], { newDistributionEnd: BigNumber }>;

    "DistributionStartUpdated(uint256)"(
      newDistributionStart?: null
    ): TypedEventFilter<[BigNumber], { newDistributionStart: BigNumber }>;

    DistributionStartUpdated(
      newDistributionStart?: null
    ): TypedEventFilter<[BigNumber], { newDistributionStart: BigNumber }>;

    "RewardsAccrued(address,uint256)"(
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { user: string; amount: BigNumber }
    >;

    RewardsAccrued(
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { user: string; amount: BigNumber }
    >;

    "RewardsClaimed(address,address,address,uint256)"(
      user?: string | null,
      to?: string | null,
      claimer?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, string, string, BigNumber],
      { user: string; to: string; claimer: string; amount: BigNumber }
    >;

    RewardsClaimed(
      user?: string | null,
      to?: string | null,
      claimer?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, string, string, BigNumber],
      { user: string; to: string; claimer: string; amount: BigNumber }
    >;

    "UserIndexUpdated(address,address,uint256)"(
      user?: string | null,
      asset?: string | null,
      index?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { user: string; asset: string; index: BigNumber }
    >;

    UserIndexUpdated(
      user?: string | null,
      asset?: string | null,
      index?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { user: string; asset: string; index: BigNumber }
    >;
  };

  estimateGas: {
    EMISSION_MANAGER(overrides?: CallOverrides): Promise<BigNumber>;

    PERCENTAGE_FACTOR(overrides?: CallOverrides): Promise<BigNumber>;

    PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

    REVISION(overrides?: CallOverrides): Promise<BigNumber>;

    REWARD_TOKEN(overrides?: CallOverrides): Promise<BigNumber>;

    SECONDS_OF_ONE_MONTH(overrides?: CallOverrides): Promise<BigNumber>;

    STAKED_TOKEN(overrides?: CallOverrides): Promise<BigNumber>;

    assets(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    claimRewards(
      assets: string[],
      amount: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimRewardsOnBehalf(
      assets: string[],
      amount: BigNumberish,
      user: string,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    configureAssets(
      assets: string[],
      assetMonthlyEmissionPerSecond: BigNumberish[][],
      shareRatios: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAssetData(asset: string, overrides?: CallOverrides): Promise<BigNumber>;

    getClaimer(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    getDistributionEndTimestamp(
      asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDistributionStartTimestamp(
      asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRewardsBalance(
      assets: string[],
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserAssetData(
      user: string,
      asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserUnclaimedRewards(
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    handleAction(
      user: string,
      totalSupply: BigNumberish,
      userBalance: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setClaimer(
      user: string,
      caller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setDistributionStartTimestamp(
      asset: string,
      distributionStartTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    EMISSION_MANAGER(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    PERCENTAGE_FACTOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    PRECISION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    REVISION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    REWARD_TOKEN(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SECONDS_OF_ONE_MONTH(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    STAKED_TOKEN(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    assets(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claimRewards(
      assets: string[],
      amount: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimRewardsOnBehalf(
      assets: string[],
      amount: BigNumberish,
      user: string,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    configureAssets(
      assets: string[],
      assetMonthlyEmissionPerSecond: BigNumberish[][],
      shareRatios: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAssetData(
      asset: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getClaimer(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDistributionEndTimestamp(
      asset: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDistributionStartTimestamp(
      asset: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRewardsBalance(
      assets: string[],
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUserAssetData(
      user: string,
      asset: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUserUnclaimedRewards(
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    handleAction(
      user: string,
      totalSupply: BigNumberish,
      userBalance: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setClaimer(
      user: string,
      caller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setDistributionStartTimestamp(
      asset: string,
      distributionStartTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
