import { PreventIframe } from "express-msteams-host";

/**
 * Used as place holder for the decorators
 */
@PreventIframe("/signatorDemoTab/index.html")
@PreventIframe("/signatorDemoTab/config.html")
@PreventIframe("/signatorDemoTab/remove.html")
export class SignatorDemoTab {
}
