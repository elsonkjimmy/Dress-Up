package com.dressup;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
//import org.devio.rn.splashscreen.SplashScreen; // Importez SplashScreen si nécessaire

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState);
    // Supprimez la ligne suivante pour ne pas afficher le Splash Screen natif
    // SplashScreen.show(this);  
  }

  override fun getMainComponentName(): String = "DressUp"  // Nom du composant React Native

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
