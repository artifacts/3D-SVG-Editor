import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { AnchorType } from '../anchor/anchor.model';
import { IPosition } from '../canvas.model';

/**
 * Using CONSTANT naming convention and holding same value
 * to be able to check if an enum value is in enum keys
 */
export enum PathActionType {
	PATH_ADD_ANCHOR = 'PATH_ADD_ANCHOR',
	PATH_UPDATE_ANCHOR = 'PATH_UPDATE_ANCHOR',
	PATH_CHANGE_ANCHOR_TYPE = 'PATH_CHANGE_ANCHOR_TYPE',
	PATH_UPDATE_BEZIER_HANDLE = 'PATH_UPDATE_BEZIER_HANDLE',
	PATH_REMOVE_ANCHOR = 'PATH_REMOVE_ANCHOR',
	PATH_REMOVE_LAST_ANCHOR = 'PATH_REMOVE_LAST_ANCHOR',
	PATH_ZIP_PATH = 'PATH_ZIP_PATH',
}

export interface IAddAnchorPayload {
	targetIn: Array<number>;
	anchorPosition: IPosition;
}
export interface IUpdateAnchorPayload extends IAddAnchorPayload {
	idx: number;
}
export interface IRemoveAnchorPayload {
	targetIn: Array<number>;
	idx: number;
}
export interface IChangeAnchorTypePayload {
	targetIn: Array<number>;
	idx: number;
	anchorType: AnchorType;
}
export interface IUpdateBezierHandlePayload {
	targetIn: Array<number>;
	idx: number;
	handlePosition: IPosition;
}

export type IAddAnchorAction = FluxStandardAction<IAddAnchorPayload, undefined>;
export type IUpdateAnchorAction = FluxStandardAction<IUpdateAnchorPayload, undefined>;
export type IRemoveAnchorAction = FluxStandardAction<IRemoveAnchorPayload, undefined>;
export type IRemoveLastAnchorAction = FluxStandardAction<Array<number>, undefined>;
export type IZipPathAction = FluxStandardAction<Array<number>, undefined>;
export type IChangeAnchorTypeAction = FluxStandardAction<IChangeAnchorTypePayload, undefined>;
export type IUpdateBezierHandleAction = FluxStandardAction<IUpdateBezierHandlePayload, undefined>;

@Injectable()
export class PathActions {
	/**
	 * Note:
	 *
	 * Don't forget to add `@dispatch()` if you want to achieve continuous dispatch.
	 * Otherwise, it will be just passing to the next operator, and only the last action is dispatched
	 */
	@dispatch()
	addAnchorAction = (targetIn: Array<number>, anchorPosition: IPosition): IAddAnchorAction => {
		return {
			type: PathActionType.PATH_ADD_ANCHOR,
			payload: { targetIn, anchorPosition },
			meta: undefined,
		};
	}

	@dispatch() // LATER move Anchor specific actions to `anchor.actions`
	updateAnchorAction = (targetIn: Array<number>, idx: number, anchorPosition: IPosition): IUpdateAnchorAction => {
		return {
			type: PathActionType.PATH_UPDATE_ANCHOR,
			payload: { targetIn, idx, anchorPosition },
			meta: undefined,
		};
	}

	@dispatch() // LATER move Anchor specific actions to `anchor.actions`
	changeAnchorTypeAction = (targetIn: Array<number>, idx: number, anchorType: AnchorType): IChangeAnchorTypeAction => {
		return {
			type: PathActionType.PATH_CHANGE_ANCHOR_TYPE,
			payload: { targetIn, idx, anchorType },
			meta: undefined,
		};
	}

	@dispatch()
	updateBezierHandleAction = (targetIn: Array<number>, idx: number, handlePosition: IPosition): IUpdateBezierHandleAction => {
		return {
			type: PathActionType.PATH_UPDATE_BEZIER_HANDLE,
			payload: { targetIn, idx, handlePosition },
			meta: undefined,
		};
	}

	@dispatch()
	removeAnchorAction = (targetIn: number[], idx: number): IRemoveAnchorAction => {
		return {
			type: PathActionType.PATH_REMOVE_ANCHOR,
			payload: { targetIn, idx },
			meta: undefined,
		};
	}

	@dispatch()
	removeLastAnchorAction = (targetIn: number[]): IRemoveLastAnchorAction => {
		return {
			type: PathActionType.PATH_REMOVE_LAST_ANCHOR,
			payload: targetIn,
			meta: undefined,
		};
	}

	@dispatch()
	zipPathAction = (targetIn: Array<number>) => {
		return {
			type: PathActionType.PATH_ZIP_PATH,
			payload: targetIn,
			meta: undefined,
		};
	}
}
