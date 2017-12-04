import { Action, Reducer } from 'redux';

import { CanvasState } from '../canvas.model';
import {
	AddSelectAction,
	DeselectAction,
	DrawableActionType,
	SelectAction,
} from './drawable.action';
import * as drawableCore from './drawable.core';

export const drawableReducer: Reducer<CanvasState> = (state: CanvasState, action: Action) => {
	switch (action.type) {
		case DrawableActionType.DRAWABLE_SELECT:
			const selectAction = <SelectAction>action;
			return <CanvasState>drawableCore.selectDrawable(state, selectAction.payload);
		case DrawableActionType.DRAWABLE_ADD_SELECT:
			const addSelectAction = <AddSelectAction>action;
			return <CanvasState>drawableCore.addSelectDrawable(state, addSelectAction.payload);
		case DrawableActionType.DRAWABLE_DESELECT:
			const deselectAction = <DeselectAction>action;
			return <CanvasState>drawableCore.deselectDrawable(state, deselectAction.payload);
		case DrawableActionType.DRAWABLE_DESELECT_ALL:
			return <CanvasState>drawableCore.deselectAllDrawable(state);
	}
	return state;
};