/* eslint-disable header/header */

import {
	registerAction2,
	Action2,
} from "../../../../platform/actions/common/actions.js";
import { ServicesAccessor } from "../../../../platform/instantiation/common/instantiation.js";
import { INellieOverlayService } from "./nellieOverlayService.js";
import { KeyCode, KeyMod } from "../../../../base/common/keyCodes.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { PEARAI_FIRST_LAUNCH_KEY } from "./common.js";
import {
	INotificationService,
	Severity,
} from "../../../../platform/notification/common/notification.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
// import { NellieVisibleContext } from "../../../common/contextkeys.js";

export class CloseNellieOverlayAction extends Action2 {
	static readonly ID = "workbench.action.closeNellie";

	constructor() {
		super({
			id: CloseNellieOverlayAction.ID,
			title: { value: "Close Nellie IDE Popup", original: "Close Nellie IDE Popup" },
			f1: true,
			keybinding: {
				weight: 200,
				primary: KeyCode.Escape,
				// when: NellieVisibleContext.negate(),
			},
		});
	}

	run(accessor: ServicesAccessor): void {
		const nellieOverlayService = accessor.get(INellieOverlayService);
		nellieOverlayService.hide();
	}
}

export class ToggleNellieOverlayAction extends Action2 {
	static readonly ID = "workbench.action.toggleNellie";

	constructor() {
		super({
			id: ToggleNellieOverlayAction.ID,
			title: {
				value: "Toggle Nellie IDE Popup",
				original: "Toggle Nellie IDE Popup",
			},
			f1: true,
			keybinding: {
				weight: 200,
				primary: KeyMod.CtrlCmd | KeyCode.KeyE,
			},
		});
	}

	run(accessor: ServicesAccessor): void {
		const nellieOverlayService = accessor.get(INellieOverlayService);
		nellieOverlayService.toggle();
	}
}

export class MarkNellieFirstLaunchCompleteAction extends Action2 {
	static readonly ID = "workbench.action.markNellieFirstLaunchComplete";

	constructor() {
		super({
			id: MarkNellieFirstLaunchCompleteAction.ID,
			title: {
				value: "Mark Nellie IDE First Launch Key Complete",
				original: "Mark Nellie IDE First Launch Key Complete",
			},
			f1: true,
		});
	}

	run(accessor: ServicesAccessor): void {
		const storageService = accessor.get(IStorageService);
		storageService.store(PEARAI_FIRST_LAUNCH_KEY, true, 0, 0);
		// const notificationService = accessor.get(INotificationService);
		// const commandService = accessor.get(ICommandService);  // Get command service early
		// notificationService.notify({
		// 	severity: Severity.Info,
		// 	message: 'Successfully marked Nellie IDE first launch Key complete',
		// 	actions: {
		// 		primary: [{
		// 			id: 'reloadWindow',
		// 			label: 'Reload Window',
		// 			tooltip: 'Reload Window',
		// 			class: '',
		// 			enabled: true,
		// 			run: () => {
		// 				commandService.executeCommand('workbench.action.reloadWindow');
		// 			}
		// 		}]
		// 	}
		// });
	}
}

export class ResetNellieFirstLaunchKeyAction extends Action2 {
	static readonly ID = "workbench.action.resetNellieFirstLaunchKey";

	constructor() {
		super({
			id: ResetNellieFirstLaunchKeyAction.ID,
			title: {
				value: "Reset Nellie IDE First Launch Key",
				original: "Reset Nellie IDE First Launch Key",
			},
			f1: true,
		});
	}

	run(accessor: ServicesAccessor): void {
		const storageService = accessor.get(IStorageService);
		const notificationService = accessor.get(INotificationService);
		const commandService = accessor.get(ICommandService); // Get command service early

		storageService.store(PEARAI_FIRST_LAUNCH_KEY, false, 0, 0);
		notificationService.notify({
			severity: Severity.Info,
			message: "Successfully reset Nellie IDE first launch Key",
			actions: {
				primary: [
					{
						id: "reloadWindow",
						label: "Reload Window",
						tooltip: "Reload Window",
						class: "",
						enabled: true,
						run: () => {
							commandService.executeCommand("workbench.action.reloadWindow");
						},
					},
				],
			},
		});
	}
}

export class IsNellieFirstLaunchAction extends Action2 {
	static readonly ID = "workbench.action.isNellieFirstLaunch";

	constructor() {
		super({
			id: IsNellieFirstLaunchAction.ID,
			title: {
				value: "Is Nellie IDE First Launch",
				original: "Is Nellie IDE First Launch",
			},
			f1: true,
		});
	}

	run(accessor: ServicesAccessor): boolean | undefined {
		const storageService = accessor.get(IStorageService);
		return !storageService.getBoolean(PEARAI_FIRST_LAUNCH_KEY, 0);
	}
}

registerAction2(ToggleNellieOverlayAction);
registerAction2(CloseNellieOverlayAction);

registerAction2(MarkNellieFirstLaunchCompleteAction);
registerAction2(ResetNellieFirstLaunchKeyAction);
registerAction2(IsNellieFirstLaunchAction);
