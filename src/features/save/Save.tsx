import { ArrowDownToLineIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useSaveService } from "@/components/GameProvider";
import { Button } from "@/components/ui/button";

export function Save() {
	const saveService = useSaveService();

	return (
		<div>
			<Button onClick={() => saveService.save()}>
				<HugeiconsIcon icon={ArrowDownToLineIcon} />
				保存
			</Button>

			<Button
				onClick={() => {
					saveService.delete();
					location.reload();
				}}
			>
				<HugeiconsIcon icon={ArrowDownToLineIcon} />
				リセット
			</Button>
		</div>
	);
}
