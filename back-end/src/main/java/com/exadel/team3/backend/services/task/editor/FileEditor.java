package com.exadel.team3.backend.services.task.editor;

import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class FileEditor {

    private static final String FIND_PACKAGE = "^(package ).*(;)";
    private static final String FIND_SYSTEM = "(System\\.).*(\".*\")*(;)";
    private static final String FIND_RUNTIME = "(Runtime\\.).*(;)";
    private static final String FIND_IMPORT = "(import) .*.";

    public static String getFile(InputStream inputStream) throws IOException {
        BufferedReader bufRead = new BufferedReader(new InputStreamReader(inputStream));
        StringBuilder builder = new StringBuilder();
        String line;
        while((line = bufRead.readLine())!= null){
            builder.append(line).append("\n");
        }
        return builder.toString();
    }

    public static Map<String, String> editFiles(Map<String, String> fileMap) throws IOException {

        for(Map.Entry<String, String> entry : fileMap.entrySet()) {

            String fileContent = entry.getValue();
            fileContent = deleteFirst(fileContent, FIND_PACKAGE, "");
            fileContent = deleteAll(fileContent, FIND_SYSTEM, "");
            fileContent = deleteAll(fileContent, FIND_RUNTIME, "");

            for(Map.Entry<String, String> fileNames : fileMap.entrySet()) {
                fileContent = deleteAll(fileContent, FIND_IMPORT  + fileNames.getKey() + "(;)", "");
            }

            entry.setValue(fileContent);
        }

        return fileMap;
    }

    private static List<String> getNamesFiles(List<File> fileList) {
        List<String> stringList = new ArrayList<>();
        for (File file : fileList) {
            stringList.add(file.getName().replace(".java", ""));
        }
        return stringList;
    }

    private static String deleteFirst(String fileContent, String regex, String replacement) throws IOException {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(fileContent);
        return matcher.replaceFirst(replacement);
    }

    private static String deleteAll(String fileContent, String regex, String replacement) throws IOException {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(fileContent);
        return matcher.replaceAll(replacement);
    }
}
