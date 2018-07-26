package com.exadel.team3.backend.services.task.editor;

import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class FileEditor {

    private static final String FIND_PACKAGE = "^(package ).*(;)";
    private static final String FIND_SYSTEM = "(System\\.).*(\".*\")*(;)";
    private static final String FIND_RUNTIME = "(Runtime\\.).*(;)";
    private static final String FIND_IMPORT = "(import) .*.";


    public static List<File> editFiles(List<File> fileList) throws IOException {
        List<String> stringList = getNamesFiles(fileList);

        for (File file : fileList) {
            Path path = file.toPath();
            String fileContent = new String(Files.readAllBytes(path));

            fileContent = deleteFirst(fileContent, FIND_PACKAGE, "");
            fileContent = deleteAll(fileContent, FIND_SYSTEM, "");
            fileContent = deleteAll(fileContent, FIND_RUNTIME, "");

            for(String nameFile : stringList) {
                fileContent = deleteAll(fileContent, FIND_IMPORT  + nameFile + "(;)", "");
            }

            Files.write(path, fileContent.getBytes());
        }

        return fileList;
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
