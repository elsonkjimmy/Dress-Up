import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import SplashScreen // Importez le package

@main
class AppDelegate: RCTAppDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    self.moduleName = "DressUp"
    self.dependencyProvider = RCTAppDependencyProvider()

    // Afficher l'écran de démarrage au lancement
    SplashScreen.show() // Affiche l'écran de démarrage au début

    // Vous pouvez ajouter des propriétés initiales ici si nécessaire
    self.initialProps = [:]

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")  // En mode développement
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")  // En mode production
#endif
  }
}
