package model;

public class ManualControlsModel {
    int id;
    boolean lights, shades, fans, water;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isLights() {
        return lights;
    }

    public void setLights(boolean lights) {
        this.lights = lights;
    }

    public boolean isShades() {
        return shades;
    }

    public void setShades(boolean shades) {
        this.shades = shades;
    }

    public boolean isFans() {
        return fans;
    }

    public void setFans(boolean fans) {
        this.fans = fans;
    }

    public boolean isWater() {
        return water;
    }

    public void setWater(boolean water) {
        this.water = water;
    }
}