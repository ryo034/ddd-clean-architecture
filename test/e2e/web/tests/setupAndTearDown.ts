import { Step } from "gauge-ts";
import {
	AfterScenario,
	AfterSuite,
	BeforeScenario,
	BeforeSuite,
} from "gauge-ts";
import { clearFirebase, setupFirebase } from "./firebase";

export default class SetupAndTearDown {
	@BeforeScenario({ tags: ["statefulAll"] })
	async beforeScenarioStatefulAll() {
		await Promise.all([clearFirebase()]);
		await Promise.all([setupFirebase()]);
	}

	@AfterScenario({ tags: ["statefulAll"] })
	async afterScenario() {
		await Promise.all([clearFirebase()]);
		await Promise.all([setupFirebase()]);
	}

	@AfterSuite()
	async afterSuite() {}
}
