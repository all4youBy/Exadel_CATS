package org.mdkt.compiler;

public class SampleClassExt {
    private String string;

    public SampleClassExt(String string) {
        this.string = string;
    }

    public String method(){
        return SampleClassExt2.method(string);
    }

}