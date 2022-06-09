
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
      return commands.redirect(pathRedirect? pathRedirect: '/');
    }

    return undefined;
  }

  public async pageEnabledAdmin(context: Context, commands: Commands, pathRedirect?: string): Promise<RedirectResult | undefined> {
    const isAdmin = await this.authService.isAdmin();

    if(!isAdmin) {
      return commands.redirect(pathRedirect? pathRedirect: '/');
    }

    return undefined;
  }

  public async pageEnabledConsumer(context: Context, commands: Commands, pathRedirect?: string): Promise<RedirectResult | undefined> {
    const isConsumer = await this.authService.isConsumer();

    if(!isConsumer) {
      return commands.redirect(pathRedirect? pathRedirect: '/');
    }

    return undefined;
  }
}