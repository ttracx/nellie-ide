/* eslint-disable header/header */

import {
	registerSingleton,
	InstantiationType,
} from "../../../../platform/instantiation/common/extensions.js";
import { Disposable, IDisposable } from "../../../../base/common/lifecycle.js";
import { NellieOverlayPart } from "./nellieOverlayPart.js";
import {
	createDecorator,
	IInstantiationService,
} from "../../../../platform/instantiation/common/instantiation.js";
import { IEditorService } from "../../../../workbench/services/editor/common/editorService.js";
import { ITerminalService } from "../../../../workbench/contrib/terminal/browser/terminal.js";
import { CommandsRegistry } from "../../../../platform/commands/common/commands.js";

export const INellieOverlayService = createDecorator<INellieOverlayService>(
	"nellieOverlayService",
);

export interface INellieOverlayService extends IDisposable {
	readonly _serviceBrand: undefined;

	/**
	 * Returns the NellieOverlayPart instance.
	 */
	readonly nellieOverlayPart: NellieOverlayPart;

	/**
	 * Shows the Nellie IDE popup.
	 */
	show(): void;

	/**
	 * Hides the Nellie IDE popup.
	 */
	hide(): void;

	/**
	 * Toggles the visibility of the Nellie IDE popup.
	 */
	toggle(): void;

	/**
	 * Returns true if the Nellie IDE popup is visible.
	 */
	isVisible(): boolean;

	/**
	 * Locks the Nellie IDE popup.
	 */
	lock(): void;

	/**
	 * Unlocks the Nellie IDE popup.
	 */
	unlock(): void;

	/**
	 * Returns true if the Nellie IDE popup is locked.
	 */
	isLocked(): boolean;

	/**
	 * Hides the loading overlay message.
	 */
	hideOverlayLoadingMessage(): void;

	postMessageToWebview(msg: any): Promise<boolean>;
}

export class NellieOverlayService
	extends Disposable
	implements INellieOverlayService
{
	declare readonly _serviceBrand: undefined;

	private readonly _nellieOverlayPart: NellieOverlayPart;

	constructor(
		@IInstantiationService
		private readonly instantiationService: IInstantiationService,
		@IEditorService private readonly _editorService: IEditorService,
		@ITerminalService private readonly _terminalService: ITerminalService,
		// @ICommandService private readonly commandService: ICommandService,
	) {
		super();
		this._nellieOverlayPart =
			this.instantiationService.createInstance(NellieOverlayPart);
		this.registerListeners();
		this.registerCommands();
	}

	private registerListeners(): void {
		this._register(
			this._editorService.onDidActiveEditorChange(() => {
				this.hide();
			}),
		);

		this._register(
			this._terminalService.onDidFocusInstance(() => {
				this.hide();
			}),
		);
	}

	private registerCommands(): void {
		// Register commands for external use e.g. in nellie submodule
		CommandsRegistry.registerCommand("nellie.isOverlayVisible", (accessor) => {
			const overlayService = accessor.get(INellieOverlayService);
			return overlayService.isVisible();
		});

		CommandsRegistry.registerCommand("nellie.showOverlay", (accessor) => {
			const overlayService = accessor.get(INellieOverlayService);
			overlayService.show();
		});

		CommandsRegistry.registerCommand("nellie.showOverlay.feedback", (accessor) => {
			const overlayService = accessor.get(INellieOverlayService);
			overlayService.show();
			overlayService.postMessageToWebview({
				destination: "settings",
				messageType: "tab",
				messageId: "1",
				payload: {
					tab: "creator-feedback"
				}
			});
		});

		CommandsRegistry.registerCommand("nellie.hideOverlay", (accessor) => {
			const overlayService = accessor.get(INellieOverlayService);
			overlayService.hide();
		});

		CommandsRegistry.registerCommand("nellie.toggleOverlay", (accessor) => {
			const overlayService = accessor.get(INellieOverlayService);
			overlayService.toggle();
		});

		CommandsRegistry.registerCommand("nellie.lockOverlay", (accessor) => {
			const overlayService = accessor.get(INellieOverlayService);
			overlayService.lock();
		});

		CommandsRegistry.registerCommand("nellie.unlockOverlay", (accessor) => {
			const overlayService = accessor.get(INellieOverlayService);
			overlayService.unlock();
		});

		CommandsRegistry.registerCommand("nellie.isOverlayLocked", (accessor) => {
			const overlayService = accessor.get(INellieOverlayService);
			return overlayService.isLocked();
		});

		CommandsRegistry.registerCommand("nellie.hideOverlayLoadingMessage", (accessor) => {
			const overlayService = accessor.get(INellieOverlayService);
			overlayService.hideOverlayLoadingMessage();
		});
	}

	get nellieOverlayPart(): NellieOverlayPart {
		return this._nellieOverlayPart;
	}

	show(): void {
		this._nellieOverlayPart.show();
	}

	hide(): void {
		this._nellieOverlayPart.hide();
	}

	hideOverlayLoadingMessage(): void {
		this._nellieOverlayPart.hideOverlayLoadingMessage();
	}

	toggle(): void {
		this._nellieOverlayPart.toggle();
	}

	lock(): void {
		this._nellieOverlayPart.lock();
	}

	unlock(): void {
		this._nellieOverlayPart.unlock();
	}

	isLocked(): boolean {
		return this._nellieOverlayPart.isLocked;
	}

	override dispose(): void {
		super.dispose();
		this._nellieOverlayPart.dispose();
	}

	isVisible(): boolean {
		return this._nellieOverlayPart.isVisible();
	}

	postMessageToWebview(msg: { messageType: string, payload: any, messageId?: string}): Promise<boolean> {
		return this._nellieOverlayPart.postMessageToWebview(msg);
	}
}

registerSingleton(
	INellieOverlayService,
	NellieOverlayService,
	InstantiationType.Eager,
);
