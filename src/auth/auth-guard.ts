
import { Commands, Context, RedirectResult } from '@vaadin/router';
import { AuthorizationService } from './authorization';

interface PageEnabled {
  pageEnabled(
    context: Context,
    commands: Commands,
    pathRedirect?: string
  ): Promise<RedirectResult | undefined>;
}

export class AuthGuard implements PageEnabled {

  private authService: AuthorizationService;

  constructor() {
    this.authService = new AuthorizationService();
  }

  public async pageEnabled(context: Context, commands: Commands, pathRedirect?: string): Promise<RedirectResult | undefined> {
    const isAuthenticated = await this.authService.isAuthorized();

    if(!isAuthenticated) {
      return commands.redirect(pathRedirect || '/');
    }

    return undefined;
  }

  async redirectTo(commands: Commands, pathRedirect?: string): Promise<RedirectResult | undefined> {
    const isAuthenticated = await this.authService.isAuthorized();

    if (isAuthenticated) {
      return commands.redirect(pathRedirect || '/');
    }

    return undefined;
  }

}