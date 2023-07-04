import {
	AfterScenario,
	BeforeScenario,
} from "gauge-ts";
import { clearFirebase, setupFirebase } from "./firebase";

export default class SetupAndTearDown {
	@BeforeScenario({ tags: ["statefulAll"] })
	async beforeScenarioStatefulAll() {
		await clearFirebase();
		await setupFirebase();
	}

	@AfterScenario({ tags: ["statefulAll"] })
	async afterScenario() {
		await clearFirebase();
		await setupFirebase();
	}
}
