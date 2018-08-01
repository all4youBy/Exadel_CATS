package org.mdkt.compiler;


public class SampleClass {
    public static void main(String[] args) {

    }

    public static String execute(String... args) {
        SampleClassExt sampleClassExt = new SampleClassExt(args[0]);

        return sampleClassExt.method();
    }
}
